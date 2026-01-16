import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const hoverElements = document.querySelectorAll('a, button, .hover-trigger');

        const onHover = () => {
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderColor: 'rgba(212, 175, 55, 0.4)',
                duration: 0.3,
            });
        };

        const onLeave = () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                duration: 0.3,
            });
        };

        window.addEventListener('mousemove', moveCursor);
        hoverElements.forEach((el) => {
            el.addEventListener('mouseenter', onHover);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            hoverElements.forEach((el) => {
                el.removeEventListener('mouseenter', onHover);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-gold-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
            />
        </>
    );
};

export default CustomCursor;
