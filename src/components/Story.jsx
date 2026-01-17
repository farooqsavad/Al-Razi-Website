import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth <= 768

            if (isMobile) {
                // Mobile: Title appears when scrolling to section
                gsap.fromTo('.story-title-container',
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 70%',
                            end: 'top 40%',
                            scrub: true,
                            invalidateOnRefresh: true,
                        }
                    }
                )

                // Mobile: Pin title at top while content scrolls horizontally
                ScrollTrigger.create({
                    trigger: '.story-content',
                    start: 'top 35vh',
                    end: 'bottom bottom',
                    pin: '.story-title-container',
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                })

                // Mobile: Content scrolls horizontally
                const contentScroll = gsap.to('.story-content',
                    {
                        x: () => -(document.querySelector('.story-content').scrollWidth - window.innerWidth + 100),
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.story-content',
                            pin: false,
                            scrub: 1,
                            start: 'top 35vh',
                            end: () => `+=${document.querySelector('.story-content').scrollWidth}`,
                            invalidateOnRefresh: true,
                        }
                    }
                )
            } else {
                // Desktop: Original behavior
                gsap.fromTo('.story-title-container',
                    { x: '100%', opacity: 1 },
                    {
                        x: '0%',
                        opacity: 1,
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

                gsap.fromTo('.story-content',
                    { x: '100%', opacity: 1 },
                    {
                        x: '0%',
                        opacity: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 95%',
                            end: 'top 70%',
                            scrub: true,
                            invalidateOnRefresh: true,
                        }
                    }
                )

                const paragraphs = gsap.utils.toArray('.story-text')
                paragraphs.forEach((p) => {
                    gsap.fromTo(p,
                        { opacity: 0.05, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.5,
                            scrollTrigger: {
                                trigger: p,
                                start: 'top 90%',
                                end: 'top 50%',
                                scrub: true,
                            }
                        }
                    )
                })

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    pin: '.story-title-container',
                    pinSpacing: false
                })
            }

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="origin" ref={sectionRef} className="relative min-h-screen md:min-h-[300vh] bg-black text-white flex flex-col md:flex-row border-t border-white/5 z-10 overflow-hidden">
            {/* Title Section - Mobile: Sticky when scrolling, Desktop: Left Side Sticky */}
            <div className="w-full md:w-1/2 md:h-screen flex items-center justify-center story-title-container bg-black z-20 py-12 md:py-0 md:sticky md:top-0">
                <div className="text-left px-8 sm:px-12 md:px-24 w-full">
                    <span className="text-gold-accent font-display tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[9px] sm:text-[10px] mb-4 sm:mb-6 block">Our Origin</span>
                    <h2 className="text-6xl sm:text-7xl md:text-9xl font-bold font-display tracking-tighter leading-none text-white overflow-hidden">
                        <span className="block translate-y-2">THE</span>
                        <span className="block text-gold-accent italic translate-y-[-10%]">AL RAZI</span>
                        <span className="block translate-y-[-20%]">WAY</span>
                    </h2>
                </div>
            </div>

            {/* Content Section - Mobile: Horizontal scroll, Desktop: Horizontal scroll with pin */}
            <div className="story-content w-full md:w-1/2 px-8 sm:px-12 md:px-24 py-12 md:py-[50vh] flex flex-row gap-8 md:gap-[60vh] relative z-10 overflow-x-auto md:overflow-x-auto">
                <div className="story-text max-w-lg flex-shrink-0">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        It begins with <span className="text-gold-accent">Patience</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        True Mandi isn't cooked; it's coaxed into perfection. We honor the ancestral methods where heat, wood, and time harmonize to transform simple ingredients into a royal banquet.
                    </p>
                </div>

                <div className="story-text max-w-lg flex-shrink-0">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        The Secret of <span className="text-gold-accent italic">Bukhari</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        Our spices are sourced from lands where the Silk Road once thrived. Each grain of rice is infused with a lineage of flavor that spans across generations and borders.
                    </p>
                </div>

                <div className="story-text max-w-lg flex-shrink-0">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        A Legacy in <span className="text-gold-accent">Gold</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        From the first flicker of the fire to the golden garnish on your plate, Al Razi stands as a testament to the uncompromising pursuit of culinary excellence.
                    </p>
                </div>
            </div>
        </section>
    )
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        True Mandi isn't cooked; it's coaxed into perfection. We honor the ancestral methods where heat, wood, and time harmonize to transform simple ingredients into a royal banquet.
                    </p>
                </div>

                <div className="story-text max-w-lg">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        The Secret of <span className="text-gold-accent italic">Bukhari</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        Our spices are sourced from lands where the Silk Road once thrived. Each grain of rice is infused with a lineage of flavor that spans across generations and borders.
                    </p>
                </div>

                <div className="story-text max-w-lg">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        A Legacy in <span className="text-gold-accent">Gold</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        From the first flicker of the fire to the golden garnish on your plate, Al Razi stands as a testament to the uncompromising pursuit of culinary excellence.
                    </p>
                </div>
            </div>
        </section>
    )
}
