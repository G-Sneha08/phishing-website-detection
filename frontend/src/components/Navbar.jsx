import React, { useState, useEffect } from 'react';
import { Shield, LayoutDashboard, Search, History, Upload, Github, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Live Scanner', path: '/#scanner', icon: Search },
        { name: 'Threat Analytics', path: '/#analytics', icon: LayoutDashboard },
        { name: 'Workflows', path: '/#how-it-works', icon: Shield },
        { name: 'Scan History', path: '/#history', icon: History },
        { name: 'Upload', path: '/upload', icon: Upload },
    ];

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);
        if (location.pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2.5 group">
                        <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all group-hover:rotate-12">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                            PhishGuard <span className="text-primary italic">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            // Check if link is an anchor on same page
                            const isAnchor = link.path.startsWith('/#');
                            return isAnchor ? (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.path.replace('/#', ''))}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.name}
                                </button>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${location.pathname === link.path ? 'bg-white/5 text-primary' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/G-Sneha08/phishing-website-detection"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex p-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <button className="cyber-button-primary text-xs font-bold py-2.5 px-6 hidden sm:block shadow-glow-primary/20">
                            SECURE ACCESS
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 text-zinc-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-zinc-950 border-b border-white/5"
                    >
                        <div className="px-4 py-8 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.path.replace('/#', ''))}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 text-left font-bold"
                                >
                                    <link.icon className="w-5 h-5 text-primary" />
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
