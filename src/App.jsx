import React, { useEffect, useMemo } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import Story from './components/Story'
import Philosophy from './components/Philosophy'
import ProductShowcase from './components/ProductShowcase'
import Navbar from './components/layout/Navbar'
import Loading from './components/ui/Loading'
import CustomCursor from './components/ui/CustomCursor'
import { useImagePreloader } from './hooks/useImagePreloader'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Generate paths for frames 001 to 091
const generateFramePaths = () => {
  return Array.from({ length: 91 }, (_, i) =>
    `/frame-sequence/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.jpg`
  )
}

function App() {
  const framePaths = useMemo(() => generateFramePaths(), [])
  const { isLoaded, progress, loadedImages } = useImagePreloader(framePaths)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Stop scrolling while loading
    if (!isLoaded) {
      lenis.stop()
    } else {
      lenis.start()
    }

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf) // This is fine as is, but we could be more explicit
    }
  }, [isLoaded])

  return (
    <div className="bg-black min-h-screen w-full text-white font-body selection:bg-gold-accent selection:text-black">
      <CustomCursor />
      {/* Loading Screen */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-700 ease-out pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        {!isLoaded && <Loading progress={progress} />}
      </div>

      <main className="relative w-full">
        {isLoaded ? (
          <div className="relative w-full">
            <Navbar />

            {/* 1. Sticky Background Layer */}
            <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
              <Hero images={loadedImages} />
            </div>

            {/* 2. Overlay Content Layer: slides UP over the background */}
            <div className="relative z-10 -mt-[100vh] w-full">
              {/* This spacer provides the 'Intro' duration. 
                  Starts at scroll 0 because of the negative margin on parent. */}
              <div id="hero-trigger" className="h-[150vh] w-full pointer-events-none" />

              <div className="relative bg-black border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] w-full overflow-hidden">
                <Philosophy />
                <ProductShowcase />
                <Story />
              </div>

              {/* Footer */}
              <footer className="py-24 bg-black text-center text-gray-600 text-sm relative z-20 border-t border-white/5">
                <p className="tracking-[0.3em] uppercase opacity-50">&copy; 2026 AL RAZI. CRAFTED WITH FIRE.</p>
              </footer>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default App
