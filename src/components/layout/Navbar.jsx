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
        <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
            <div className="w-full flex justify-between items-center pointer-events-auto backdrop-blur-xl px-6 py-4 md:px-12 md:py-5">

                {/* Logo */}
                <a href="#experience" className="group flex flex-col items-start gap-1">
                    <span className="text-lg sm:text-xl md:text-2xl font-display font-bold tracking-[0.2em] sm:tracking-[0.3em] text-white group-hover:text-gold-accent transition-colors duration-500">
                        AL MIYA
                    </span>
                    <div className="h-[1px] w-0 group-hover:w-full bg-gold-accent transition-all duration-700 ease-out" />
                </a>

                {/* Grouped Header / Menu Toggle */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-4 sm:gap-6 group p-2 -mr-2"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <span className="text-[10px] uppercase tracking-[0.5em] text-white/60 group-hover:text-gold-accent transition-colors duration-500 hidden md:inline-block">
                            {isMenuOpen ? "Close" : "Explore"}
                        </span>
                        <div className="flex flex-col gap-2 w-7 sm:w-8">
                            <div className={`h-[1px] w-full bg-white transition-transform duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                            <div className={`h-[1px] w-full bg-white transition-opacity duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <div className={`h-[1px] w-full bg-white transition-transform duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>

                    {/* Expanded Menu Dropdown */}
                    <div className={`absolute top-full right-0 mt-6 sm:mt-8 w-56 sm:w-64 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-sm p-6 sm:p-8 transition-all duration-700 ease-cinematic ${isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
                        <ul className="space-y-5 sm:space-y-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-gold-accent transition-colors duration-300 py-1"
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
