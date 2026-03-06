import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail, ExternalLink, Heart, Globe, Terminal } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-white/5 bg-zinc-950/80 backdrop-blur-3xl pt-24 pb-12 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand & Description */}
                    <div className="col-span-1 lg:col-span-2">
                        <div className="flex items-center gap-2.5 mb-8">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-2xl font-black tracking-tight">PhishGuard <span className="text-primary italic">AI</span></span>
                        </div>
                        <p className="text-zinc-500 text-lg leading-relaxed max-w-md mb-8 italic font-medium">
                            "Empowering digital safety through advanced machine learning and real-time threat intelligence. Your first line of defense against modern phishing attacks."
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={Github} href="https://github.com/G-Sneha08/phishing-website-detection" />
                            <SocialLink icon={Linkedin} href="#" />
                            <SocialLink icon={Twitter} href="#" />
                            <SocialLink icon={Mail} href="mailto:contact@phishguard.ai" />
                        </div>
                    </div>

                    {/* Developer Info */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Developer Info</h4>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-zinc-600 text-xs font-bold uppercase tracking-wider">Lead Developer</span>
                                <span className="text-zinc-300 font-bold">Sneha</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-zinc-600 text-xs font-bold uppercase tracking-wider">Project Focus</span>
                                <span className="text-zinc-300 font-bold">Full-Stack AI Security</span>
                            </div>
                            <div className="pt-2">
                                <a href="https://github.com/G-Sneha08" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm font-bold">
                                    <Terminal className="w-4 h-4" /> View Portfolio <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Support */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Contact System</h4>
                        <ul className="space-y-5 text-zinc-500">
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex flex-col">
                                    <span className="text-zinc-300 font-bold">Support Hub</span>
                                    <span className="text-xs">Get help with the platform</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex flex-col">
                                    <span className="text-zinc-300 font-bold">API Documentation</span>
                                    <span className="text-xs">Integrate PhishGuard AI</span>
                                </a>
                            </li>
                            <li>
                                <div className="flex flex-col">
                                    <span className="text-zinc-300 font-bold">Global HQ</span>
                                    <span className="text-xs">Remote / India</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            © 2024 PhishGuard AI. All Digital Assets Protected.
                        </p>
                        <div className="flex gap-6 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5">
                        <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">System Integrity:</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-[10px] font-black text-success uppercase">Optimal</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-zinc-800 text-[8px] font-medium tracking-[0.4em] uppercase flex items-center justify-center gap-2">
                        Made with <Heart className="w-3 h-3 text-accent fill-accent" /> for Cybersecurity Excellence
                    </p>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon: Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:bg-primary/20 hover:text-white transition-all transform hover:-translate-y-1 border border-white/5 hover:border-primary/30"
    >
        <Icon className="w-5 h-5" />
    </a>
);

export default Footer;
