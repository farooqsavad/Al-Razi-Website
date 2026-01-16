import React, { useState, useEffect } from 'react';
import PremiumButton from '../ui/PremiumButton';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Experience", href: "#experience" },
        { name: "Legacy", href: "#legacy" },
        { name: "Showcase", href: "#showcase" },
        { name: "Origin", href: "#origin" }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 md:px-12 md:py-10 pointer-events-none">
            <div className="max-w-[1800px] mx-auto flex justify-between items-center w-full pointer-events-auto">

                {/* Logo */}
                <a href="#experience" className="group flex flex-col items-start gap-1">
                    <span className="text-xl md:text-2xl font-display font-bold tracking-[0.3em] text-white group-hover:text-gold-accent transition-colors duration-500">
                        AL RAZI
                    </span>
                    <div className="h-[1px] w-0 group-hover:w-full bg-gold-accent transition-all duration-700 ease-out" />
                </a>

                {/* Grouped Header / Menu Toggle */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-6 group"
                    >
                        <span className="text-[10px] uppercase tracking-[0.5em] text-white/60 group-hover:text-gold-accent transition-colors duration-500 hidden md:inline-block">
                            {isMenuOpen ? "Close" : "Explore"}
                        </span>
                        <div className="flex flex-col gap-1.5 w-8">
                            <div className={`h-[1px] w-full bg-white transition-transform duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <div className={`h-[1px] w-full bg-white transition-opacity duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <div className={`h-[1px] w-full bg-white transition-transform duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>

                    {/* Expanded Menu Dropdown */}
                    <div className={`absolute top-full right-0 mt-8 w-64 bg-black/40 backdrop-blur-xl border border-white/10 rounded-sm p-8 transition-all duration-700 ease-cinematic ${isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
                        <ul className="space-y-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-gold-accent transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:block">
                    <PremiumButton className="!px-6 !py-2.5 !text-[9px]">
                        Reserve Table
                    </PremiumButton>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
