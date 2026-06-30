import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''
const AGENT_EMAIL = Deno.env.get('AGENT_EMAIL') || ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

serve(async (req) => {
  const { lead_id } = await req.json()
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { data: lead, error } = await supabase.from('leads').select('*, listings(title), interior_projects(title)').eq('id', lead_id).single()
  if (error || !lead) return new Response('Lead not found', { status: 404 })

  const subject = `New Lead: ${lead.name} — ${lead.type}`
  const propertyTitle = (lead.listings as any)?.title || (lead.interior_projects as any)?.title || ''

  // Notify agent
  if (RESEND_API_KEY && AGENT_EMAIL) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'notifications@yourdomain.com',
        to: AGENT_EMAIL,
        subject,
        html: `
          <h2>New Lead Received</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> ${lead.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
          <p><strong>Type:</strong> ${lead.type}</p>
          ${propertyTitle ? `<p><strong>Property:</strong> ${propertyTitle}</p>` : ''}
          <p><strong>Message:</strong> ${lead.message || 'N/A'}</p>
        `,
      }),
    })

    // Auto-reply to lead
    if (lead.email) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: AGENT_EMAIL,
          to: lead.email,
          subject: 'Thank you for your inquiry',
          html: `
            <h2>Thank you, ${lead.name}!</h2>
            <p>We have received your inquiry${propertyTitle ? ` regarding <strong>${propertyTitle}</strong>` : ''} and will get back to you shortly.</p>
            <p>Our team typically responds within 24 hours.</p>
          `,
        }),
      })
    }
  }

  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
})
