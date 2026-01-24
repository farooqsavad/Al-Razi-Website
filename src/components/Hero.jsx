import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ images }) {
    const sectionRef = useRef(null)
    const canvasRef = useRef(null)
    const textContainerRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const contextRef = useRef(null)

    useEffect(() => {
        if (!images || images.length === 0 || !canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d', { alpha: false })
        if (!context) return
        contextRef.current = context

        const frameObj = { frame: 0 }

        const renderFrame = () => {
            if (!contextRef.current || !images) return
            const idx = Math.round(frameObj.frame)
            const img = images[idx]
            if (!img) return

            const cw = canvas.width
            const ch = canvas.height
            const imgRatio = img.width / img.height
            const canvasRatio = cw / ch

            let rw, rh
            const isMobile = window.innerWidth <= 768

            if (canvasRatio > imgRatio) {
                rw = cw
                rh = cw / imgRatio
            } else {
                rw = ch * imgRatio
                rh = ch
            }

            // Mobile: use cover-style scaling to crop and zoom on the mandi platter
            if (isMobile) {
                // Cover style: fill the canvas completely, cropping as needed
                if (canvasRatio > imgRatio) {
                    rw = cw
                    rh = cw / imgRatio
                } else {
                    rw = ch * imgRatio
                    rh = ch
                }
                // Apply zoom factor to make the mandi more prominent
                const zoomFactor = 0.90
                rw *= zoomFactor
                rh *= zoomFactor
            }

            const cx = (cw - rw) / 2
            const cy = (ch - rh) / 2

            contextRef.current.drawImage(img, cx, cy, rw, rh)
        }

        const resizeCanvas = () => {
            if (!canvasRef.current) return
            canvasRef.current.width = window.innerWidth
            canvasRef.current.height = window.innerHeight
            renderFrame()
        }

        // Initialize state
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const ctx = gsap.context(() => {
            // We use the external #hero-trigger to drive animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#hero-trigger',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                }
            })

            tl.to(frameObj, {
                frame: images.length - 1,
                ease: 'none',
                onUpdate: renderFrame
            }, 0)

            // Text animations: finish early to ensure they are gone before next section slides over
            if (titleRef.current) {
                tl.fromTo(titleRef.current,
                    { letterSpacing: '-0.05em', filter: 'blur(0px) brightness(1)', opacity: 1, scale: 1 },
                    {
                        letterSpacing: '0.4em',
                        filter: 'blur(80px) brightness(2)',
                        opacity: 0,
                        scale: 1.15,
                        y: -80,
                        duration: 0.4, // Finishes at 0.42
                        ease: 'power3.inOut'
                    }, 0.02)
            }

            if (subtitleRef.current) {
                tl.fromTo(subtitleRef.current,
                    { opacity: 1, scale: 1, filter: 'blur(0px)' },
                    {
                        opacity: 0,
                        scale: 0.7,
                        filter: 'blur(40px)',
                        y: 40,
                        duration: 0.35, // Finishes at 0.4
                        ease: 'power2.inOut'
                    }, 0.05)
            }

            if (canvasRef.current) {
                tl.fromTo(canvasRef.current,
                    { scale: 1, filter: 'brightness(1)' },
                    { scale: 1.05, filter: 'brightness(0.7)', ease: 'none', duration: 1 },
                    0
                )
            }
        })

        renderFrame()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            ctx.revert()
        }
    }, [images])

    return (
        <section id="experience" ref={sectionRef} className="relative w-full h-full bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full will-change-transform" />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none pt-16 md:pt-20">
                <div ref={textContainerRef} className="text-center px-6">
                    <h1 ref={titleRef} className="text-[18vw] sm:text-[15vw] md:text-[8rem] font-bold text-white tracking-tighter leading-none mb-4 md:mb-8 font-display will-change-transform will-change-[filter]">
                        AL MIYA
                    </h1>
                    <div ref={subtitleRef} className="flex flex-col items-center gap-4 sm:gap-6 will-change-transform will-change-[filter]">
                        <div className="h-[1px] w-20 sm:w-32 bg-gold-accent/60" />
                        <p className="text-gold-accent font-display tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs md:text-sm uppercase font-medium">
                            WORLD CLASS MANDI
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
