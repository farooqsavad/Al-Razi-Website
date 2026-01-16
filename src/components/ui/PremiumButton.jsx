import React, { useRef } from 'react';
import { gsap } from 'gsap';

const PremiumButton = ({ children, className = "", ...props }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(buttonRef.current, {
            x: x * 0.2,
            y: y * 0.2,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
        });

        gsap.to(textRef.current, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });
        gsap.to(textRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden rounded-full px-10 py-4 transition-all duration-300 active:scale-95 ${className}`}
            {...props}
        >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span ref={textRef} className="relative z-10 font-display text-[10px] tracking-[0.3em] uppercase text-white group-hover:text-gold-accent transition-colors duration-500 inline-block">
                {children}
            </span>
        </button>
    );
};

export default PremiumButton;
