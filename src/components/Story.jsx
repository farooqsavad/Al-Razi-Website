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
                // Mobile: Pin title using ScrollTrigger and fade-in animations for descriptions
                const originSection = sectionRef.current
                if (originSection) {
                    const titleMobile = originSection.querySelector('.story-title-mobile')
                    const contentMobile = originSection.querySelector('.story-content-mobile')
                    
                    if (titleMobile && contentMobile) {
                        // Pin title only within Origin section bounds
                        ScrollTrigger.create({
                            trigger: contentMobile,
                            start: 'top top',
                            end: 'bottom top',
                            pin: titleMobile,
                            pinSpacing: false,
                            invalidateOnRefresh: true,
                        })
                    }

                    // Fade-in animations for descriptions
                    gsap.utils.toArray(originSection.querySelectorAll('.story-content-mobile .story-text')).forEach((el) => {
                        gsap.fromTo(el,
                            { opacity: 0, y: 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 80%',
                                    end: 'top 20%',
                                    scrub: true,
                                    invalidateOnRefresh: true,
                                }
                            }
                        )
                    })
                }
            } else if (!isMobile) {
                // Desktop: Original horizontal behavior
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
        <section id="origin" ref={sectionRef} className="relative min-h-screen md:min-h-[300vh] bg-black text-white border-t border-white/5 z-10 overflow-hidden">
            {/* Desktop Layout: Two column with title on left */}
            <div className="hidden md:flex flex-row w-full min-h-[300vh]">
                {/* Desktop: Sticky Title Container */}
                <div className="story-title-container w-1/2 h-screen flex items-center justify-center bg-black z-20 py-16">
                    <div className="text-left px-8 sm:px-12 md:px-24 w-full">
                        <span className="text-gold-accent font-display tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[9px] sm:text-[10px] mb-4 sm:mb-6 block">Our Origin</span>
                        <h2 className="text-6xl sm:text-7xl md:text-9xl font-bold font-display tracking-tighter leading-none text-white overflow-hidden">
                            <span className="block translate-y-2">THE</span>
                            <span className="block text-gold-accent italic translate-y-[-10%]">AL RAZI</span>
                            <span className="block translate-y-[-20%]">WAY</span>
                        </h2>
                    </div>
                </div>

                {/* Desktop: Scrollable Content */}
                <div className="story-content w-1/2 px-8 sm:px-12 md:px-24 py-12 md:py-[50vh] flex flex-col gap-12 md:gap-[80vh] relative z-10">
                <div className="story-text max-w-lg flex-shrink-0 md:flex-shrink-1 min-w-max md:min-w-0">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        It begins with <span className="text-gold-accent">Patience</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        True Mandi isn't cooked; it's coaxed into perfection. We honor the ancestral methods where heat, wood, and time harmonize to transform simple ingredients into a royal banquet.
                    </p>
                </div>

                <div className="story-text max-w-lg flex-shrink-0 md:flex-shrink-1 min-w-max md:min-w-0">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        The Secret of <span className="text-gold-accent italic">Bukhari</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        Our spices are sourced from lands where the Silk Road once thrived. Each grain of rice is infused with a lineage of flavor that spans across generations and borders.
                    </p>
                </div>

                <div className="story-text max-w-lg flex-shrink-0 md:flex-shrink-1 min-w-max md:min-w-0">
                    <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-6 md:mb-8">
                        A Legacy in <span className="text-gold-accent">Gold</span>.
                    </p>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                        From the first flicker of the fire to the golden garnish on your plate, Al Razi stands as a testament to the uncompromising pursuit of culinary excellence.
                    </p>
                </div>
                </div>
            </div>

            {/* Mobile Layout: Pinned title with vertical scrolling descriptions */}
            <div className="md:hidden flex flex-col w-full min-h-[300vh] pt-28">
                {/* Mobile: Pinned Title (using GSAP ScrollTrigger pin) */}
                <div className="story-title-mobile w-full bg-black z-20 px-8 sm:px-12 py-6 border-b border-white/5">
                    <span className="text-gold-accent font-display tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[9px] sm:text-[10px] mb-2 block">Our Origin</span>
                    <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tighter leading-none text-white overflow-hidden">
                        <span className="block">THE</span>
                        <span className="block text-gold-accent italic">AL RAZI</span>
                        <span className="block">WAY</span>
                    </h2>
                </div>

                {/* Mobile: Vertical Scrolling Descriptions */}
                <div className="story-content-mobile w-full flex flex-col gap-16 px-8 sm:px-12 py-12">
                    <div className="story-text w-full">
                        <p className="text-2xl sm:text-3xl font-display font-medium leading-[1.1] mb-4 text-gold-accent">Patience</p>
                        <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                            True Mandi isn't cooked; it's coaxed into perfection. We honor the ancestral methods where heat, wood, and time harmonize to transform simple ingredients into a royal banquet.
                        </p>
                    </div>

                    <div className="story-text w-full">
                        <p className="text-2xl sm:text-3xl font-display font-medium leading-[1.1] mb-4 text-gold-accent">Bukhari</p>
                        <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                            Our spices are sourced from lands where the Silk Road once thrived. Each grain of rice is infused with a lineage of flavor that spans across generations and borders.
                        </p>
                    </div>

                    <div className="story-text w-full">
                        <p className="text-2xl sm:text-3xl font-display font-medium leading-[1.1] mb-4 text-gold-accent">Gold</p>
                        <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                            From the first flicker of the fire to the golden garnish on your plate, Al Razi stands as a testament to the uncompromising pursuit of culinary excellence.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
