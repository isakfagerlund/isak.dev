import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen relative bg-brand-primary">
      <div className="absolute bottom-24 left-8 md:left-12">
        <h1 className="text-6xl md:text-8xl font-black text-brand-text mb-4 tracking-tight lowercase">
          isak.dev
        </h1>
        <p className="text-xl md:text-2xl text-brand-text font-bold tracking-wide lowercase mb-3">
          currently at: <a href="https://autarc.energy/en" target="_blank" rel="noopener noreferrer" className="animate-pulse-slow hover:underline">autarc</a>
        </p>
        <p className="text-base md:text-xl text-brand-muted font-bold tracking-wide lowercase">
          <Link to="/blog" className="hover:underline hover:text-brand-muted transition-colors">
            thoughts →
          </Link>
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-transparent py-4">
        <div className="animate-scroll-left whitespace-nowrap">
          <span className="text-lg md:text-xl font-bold tracking-wide inline-block px-8 text-brand-muted lowercase">
            autarc • shk power • enpal • pincamp • iskall • irewardhealth • en appstudio • angström konsultbyrå • ny collective • kjell & company • autarc • shk power • enpal • pincamp • iskall • irewardhealth • en appstudio • angström konsultbyrå • ny collective • kjell & company • autarc • shk power • enpal • pincamp • iskall • irewardhealth • en appstudio • angström konsultbyrå • ny collective • kjell & company • autarc • shk power • enpal • pincamp • iskall • irewardhealth • en appstudio • angström konsultbyrå • ny collective • kjell & company •
          </span>
        </div>
      </div>
    </div>
  )
}
