import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loading({ progress }) {
    const containerRef = useRef(null)
    const barRef = useRef(null)
    const numberRef = useRef(null)
    const titleRef = useRef(null)

    useEffect(() => {
        // Animate the number
        gsap.to(numberRef.current, {
            innerText: Math.round(progress),
            snap: { innerText: 1 },
            duration: 0.3,
            ease: 'none',
        })

        // Animate the bar width
        gsap.to(barRef.current, {
            width: `${progress}%`,
            duration: 0.5,
            ease: 'power2.out',
        })
    }, [progress])

    useEffect(() => {
        // Entrance animation
        gsap.from(titleRef.current, {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
        >
            <div className="relative mb-8 text-center" ref={titleRef}>
                <h2 className="text-xl font-display font-medium tracking-[0.5em] mb-2">AL MIYA</h2>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Establishing Connection...</p>
            </div>

            <div className="relative w-48 h-[1px] bg-white/10 overflow-hidden mb-4">
                <div
                    ref={barRef}
                    className="absolute top-0 left-0 h-full bg-gold-accent w-0"
                />
            </div>

            <div className="font-display text-2xl font-light flex items-baseline tracking-widest text-white/80">
                <span ref={numberRef}>0</span>
                <span className="text-[10px] ml-1 opacity-40 uppercase">Percent</span>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                <p className="text-[9px] text-white/20 uppercase tracking-[0.4em]">Designed for Legacy</p>
            </div>
        </div>
    )
}
