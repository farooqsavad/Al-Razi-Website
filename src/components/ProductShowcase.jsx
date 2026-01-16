import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import product1 from '../assets/images/product-1.png';
import product2 from '../assets/images/product-2.png';
import product3 from '../assets/images/product-3.png';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        title: "THE ROYALE MANDI",
        description: "Our signature whole roasted chicken resting on a bed of triple-saffron long-grain rice. A masterpiece of traditional Mandi craft.",
        image: product1,
        tag: "Signature",
        year: "Est. 1984"
    },
    {
        title: "SLOW-BRAISED LAMB",
        description: "Tender lamb shanks cooked for 12 hours under traditional stone-fire heat until succulent and perfectly glazed.",
        image: product2,
        tag: "Heirloom",
        year: "Limited"
    },
    {
        title: "EXOTIC SPICE BLEND",
        description: "A secret harmony of 24 spices sourced directly from the heart of the Silk Road, ground fresh for every harvest.",
        image: product3,
        tag: "The Craft",
        year: "24-Spice"
    }
];

const ProductShowcase = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const pin = gsap.to(containerRef.current, {
                x: () => -(containerRef.current.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${containerRef.current.scrollWidth}`,
                    invalidateOnRefresh: true,
                },
            });

            products.forEach((_, i) => {
                gsap.from(`.item-text-${i}`, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: `.item-trigger-${i}`,
                        start: "left 60%",
                        containerAnimation: pin,
                        toggleActions: "play none none reverse",
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="showcase" ref={sectionRef} className="relative overflow-hidden bg-black border-y border-white/5 z-10 w-full">
            <div ref={containerRef} className="flex h-screen w-max items-center">
                {products.map((product, index) => (
                    <div key={index} className={`h-screen w-screen flex-shrink-0 relative flex items-center justify-center item-trigger-${index}`}>
                        <div className="container mx-auto px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                            <div className={`item-text-${index} space-y-4 md:space-y-8 max-w-xl order-2 md:order-1`}>
                                <div className="flex items-center gap-4 text-gold-accent/60">
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-display font-medium">{product.tag}</span>
                                    <div className="h-[1px] w-8 md:w-12 bg-gold-accent/30" />
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-display">{product.year}</span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] font-display">
                                    {product.title}
                                </h2>

                                <p className="text-base md:text-lg text-white/40 leading-relaxed font-light">
                                    {product.description}
                                </p>

                                <div className="pt-4 md:pt-8">
                                    <a href="#menu" className="inline-flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white hover:text-gold-accent transition-colors group">
                                        <span>Explore the Recipe</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-2 transition-transform duration-500 md:w-6 md:h-6">
                                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="relative order-1 md:order-2">
                                <div className="aspect-[1/1] sm:aspect-[4/5] w-full max-w-[400px] mx-auto bg-white/5 overflow-hidden rounded-sm border border-white/10 group shadow-[0_0_100px_rgba(212,175,55,0.05)]">
                                    <img
                                        src={product.image}
                                        className="w-full h-full object-cover transition-all duration-1000 ease-out md:group-hover:scale-110 md:group-hover:rotate-1"
                                        alt={product.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                {/* Floating Detail */}
                                <div className="absolute -bottom-8 -right-8 w-48 aspect-square bg-black border border-white/5 p-6 backdrop-blur-3xl hidden lg:block translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest leading-loose">
                                        Hand-picked ingredients with nomadic spices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductShowcase;
