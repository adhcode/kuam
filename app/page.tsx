import Header from './components/Headers'
import Hero from './components/Hero'
import PreviewSection from './components/PreviewSection'
import Footer from './components/Footers'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF5757] via-black to-[#FF5757] text-white">
      <Header />
      <main>
        <Hero />
        <PreviewSection />
      </main>
      <Footer />
    </div>
  )
}

