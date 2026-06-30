import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lead_id } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: lead } = await supabase
      .from('leads')
      .select('*, listings(title, location, price), interior_projects(title)')
      .eq('id', lead_id)
      .single()

    if (!lead) throw new Error('Lead not found')

    const resendKey = Deno.env.get('RESEND_API_KEY')
    const agentEmail = Deno.env.get('AGENT_EMAIL') || 'agent@example.com'
    const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@example.com'

    const listingInfo = lead.listings
      ? `\nProperty: ${lead.listings.title} (${lead.listings.location}) - $${lead.listings.price}`
      : lead.interior_projects
      ? `\nProject: ${lead.interior_projects.title}`
      : ''

    if (resendKey) {
      // Notify agent
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: fromEmail,
          to: agentEmail,
          subject: `New Lead: ${lead.name} (${lead.type})`,
          html: `
            <h2>New Lead Received</h2>
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Phone:</strong> ${lead.phone || 'Not provided'}</p>
            <p><strong>Type:</strong> ${lead.type}</p>
            ${listingInfo ? `<p>${listingInfo.replace('\n', '')}</p>` : ''}
            <p><strong>Message:</strong></p>
            <blockquote>${lead.message}</blockquote>
          `,
        }),
      })

      // Auto-reply to lead
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: fromEmail,
          to: lead.email,
          subject: 'We received your inquiry!',
          html: `
            <h2>Thank you, ${lead.name}!</h2>
            <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
            ${listingInfo ? `<p>Your inquiry about: ${listingInfo.replace('\n', '')}</p>` : ''}
            <p>In the meantime, feel free to browse more properties on our website or WhatsApp us directly.</p>
            <p>Best regards,<br>The PrimeEstates Team</p>
          `,
        }),
      })
    }

    // Social posting for new listings (via webhook)
    const fbToken = Deno.env.get('FACEBOOK_PAGE_ACCESS_TOKEN')
    const fbPageId = Deno.env.get('FACEBOOK_PAGE_ID')

    if (lead.listing_id && fbToken && fbPageId) {
      const listing = lead.listings
      if (listing) {
        await fetch(`https://graph.facebook.com/v18.0/${fbPageId}/feed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `🏠 New Property Alert!\n\n${listing.title}\n📍 ${listing.location}\n💰 $${listing.price}\n\nContact us for more details!`,
            access_token: fbToken,
          }),
        }).catch(() => {})
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
