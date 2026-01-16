import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal Slide-in for the title container only
            gsap.fromTo('.story-title-container',
                { x: '100%' },
                {
                    x: '0%',
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    }
                }
            )

            // Horizontal Slide-in for the content container
            gsap.fromTo('.story-content',
                { x: '100%' },
                {
                    x: '0%',
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    }
                }
            )

            const paragraphs = gsap.utils.toArray('.story-text')

            paragraphs.forEach((p) => {
                gsap.fromTo(p,
                    { opacity: 0.05, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: p,
                            start: 'top 85%',
                            end: 'top 40%',
                            scrub: true,
                        }
                    }
                )
            })

            // Pinning the side heading - pin it after slide-in completes
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: '.story-title-container',
                pinSpacing: false
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="origin" ref={sectionRef} className="relative min-h-[300vh] bg-black text-white flex flex-col md:flex-row border-t border-white/5 z-10">
            {/* Left Side: Sticky Brand Title */}
            <div className="w-full md:w-1/2 h-screen flex items-center justify-center story-title-container bg-black z-20">
                <div className="text-left px-8 sm:px-12 md:px-24 w-full">
                    <span className="text-gold-accent font-display tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[9px] sm:text-[10px] mb-4 sm:mb-6 block">Our Origin</span>
                    <h2 className="text-6xl sm:text-7xl md:text-9xl font-bold font-display tracking-tighter leading-none text-white overflow-hidden">
                        <span className="block translate-y-2">THE</span>
                        <span className="block text-gold-accent italic translate-y-[-10%]">AL RAZI</span>
                        <span className="block translate-y-[-20%]">WAY</span>
                    </h2>
                </div>
            </div>

            {/* Right Side: Scrollable Narrative */}
            <div className="story-content w-full md:w-1/2 px-8 sm:px-12 md:px-24 py-[50vh] flex flex-col gap-[40vh] md:gap-[60vh] relative z-10">
                <div className="story-text max-w-lg">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        It begins with <span className="text-gold-accent">Patience</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/40 leading-relaxed font-light">
                        True Mandi isn't cooked; it's coaxed into perfection. We honor the ancestral methods where heat, wood, and time harmonize to transform simple ingredients into a royal banquet.
                    </p>
                </div>

                <div className="story-text max-w-lg">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        The Secret of <span className="text-gold-accent italic">Bukhari</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/40 leading-relaxed font-light">
                        Our spices are sourced from lands where the Silk Road once thrived. Each grain of rice is infused with a lineage of flavor that spans across generations and borders.
                    </p>
                </div>

                <div className="story-text max-w-lg">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        A Legacy in <span className="text-gold-accent">Gold</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/40 leading-relaxed font-light">
                        From the first flicker of the fire to the golden garnish on your plate, Al Razi stands as a testament to the uncompromising pursuit of culinary excellence.
                    </p>
                </div>
            </div>
        </section>
    )
}
