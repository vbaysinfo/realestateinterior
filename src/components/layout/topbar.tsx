import { Phone, Waves, MapPin } from 'lucide-react'

export function TopBar() {
  return (
    <div className="bg-gradient-to-r from-cyan-700 via-cyan-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-2.5">

          {/* Left — tagline */}
          <div className="flex items-center gap-2 text-xs text-cyan-100">
            <Waves className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
            <span className="font-medium">Bay of Bengal Coastal Real Estate · Visakhapatnam, Andhra Pradesh</span>
          </div>

          {/* Right — phone numbers */}
          <div className="flex items-center gap-4">
            <a href="tel:+91968190904"
              className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-orange-300 transition-colors group">
              <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-orange-400/30 flex items-center justify-center transition-colors">
                <Phone className="w-3 h-3" />
              </div>
              +91 96819 09040
            </a>
            <div className="w-px h-4 bg-cyan-500" />
            <a href="tel:+91890764231"
              className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-orange-300 transition-colors group">
              <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-orange-400/30 flex items-center justify-center transition-colors">
                <Phone className="w-3 h-3" />
              </div>
              +91 89076 42310
            </a>
            <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-4 border-l border-cyan-500">
              <MapPin className="w-3 h-3 text-orange-300 flex-shrink-0" />
              <span className="text-xs text-cyan-200 font-medium">Beach Road, Bhogapuram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
