import { Phone, Waves, MapPin } from 'lucide-react'

export function TopBar() {
  return (
    <div className="bg-gradient-to-r from-cyan-700 via-cyan-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4">

          {/* Left — tagline */}
          <div className="flex items-center gap-2.5 text-cyan-100">
            <Waves className="w-5 h-5 text-cyan-300 flex-shrink-0" />
            <span className="text-sm font-semibold tracking-wide">Bay of Bengal Coastal Real Estate · Visakhapatnam, AP</span>
          </div>

          {/* Right — phone numbers */}
          <div className="flex items-center gap-5">
            <a href="tel:+91968190904"
              className="flex items-center gap-2.5 text-base font-black text-white hover:text-orange-300 transition-colors group">
              <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-orange-400/40 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              +91 96819 09040
            </a>
            <div className="w-px h-6 bg-cyan-500" />
            <a href="tel:+91890764231"
              className="flex items-center gap-2.5 text-base font-black text-white hover:text-orange-300 transition-colors group">
              <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-orange-400/40 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              +91 89076 42310
            </a>
            <div className="hidden sm:flex items-center gap-2 ml-2 pl-5 border-l border-cyan-500">
              <MapPin className="w-4 h-4 text-orange-300 flex-shrink-0" />
              <span className="text-sm text-cyan-200 font-semibold">Beach Road, Bhogapuram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
