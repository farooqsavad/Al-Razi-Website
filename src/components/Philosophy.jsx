import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    scrub: true,
                }
            });

            // Parallax effect for the background while pinned
            tl.to('.philo-bg', {
                y: -50,
                scale: 1.05,
                opacity: 0.15,
                ease: 'none'
            }, 0);

            // Clean text entrance: no opacity/blur, just slide
            tl.fromTo('.philo-word',
                { y: 60, rotateX: -20 },
                {
                    y: 0,
                    rotateX: 0,
                    stagger: 0.08,
                    duration: 1.2,
                    ease: 'power2.out'
                }, 0);

            // Clean slide for sub-text
            tl.fromTo('.philo-sub',
                { y: 30 },
                {
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, 0.3);

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="legacy"
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center z-20"
        >
            {/* Background Ambience */}
            <div className="philo-bg absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold-accent)_0%,_transparent_70%)] opacity-10 z-0" />

            <div className="relative z-10 text-center max-w-5xl px-8">
                <h2 className="perspective-[1000px] overflow-hidden">
                    <div className="text-5xl sm:text-7xl md:text-9xl font-bold text-white leading-[0.85] tracking-tight font-display mb-8 md:mb-12">
                        <span className="philo-word inline-block">TASTE</span><br />
                        <span className="philo-word inline-block italic text-gold-accent">THE</span><br />
                        <span className="philo-word inline-block">LEGACY</span>
                    </div>
                </h2>

                <div className="philo-sub mt-4 max-w-xl mx-auto">
                    <div className="h-[1px] w-12 bg-gold-accent/40 mx-auto mb-6 md:mb-8" />
                    <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light leading-relaxed px-4">
                        Where ancient nomadic traditions meet the precision of modern culinary mastery.
                    </p>
                </div>
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
    )
}
