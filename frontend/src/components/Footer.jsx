import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-white/5 bg-zinc-950/50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Shield className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold">PhishGuard <span className="text-primary">AI</span></span>
                        </div>
                        <p className="text-zinc-400 max-w-sm mb-6">
                            Advanced phishing detection platform powered by machine learning and real-time threat intelligence. Secure your digital browsing experience with AI-driven insights.
                        </p>
                        <div className="flex gap-4">
                            <socialLink icon={Twitter} />
                            <socialLink icon={Github} />
                            <socialLink icon={Linkedin} />
                            <socialLink icon={Mail} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Platform</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><footerLink path="/">URL Scanner</footerLink></li>
                            <li><footerLink path="/analytics">Analytics</footerLink></li>
                            <li><footerLink path="/upload">Batch Upload</footerLink></li>
                            <li><footerLink path="/extension">Browser Extension</footerLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Keys</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © 2024 PhishGuard AI. Built for portfolio and cybersecurity excellence.
                    </p>
                    <p className="text-zinc-500 text-sm">
                        Powered by Random Forest & XGBoost
                    </p>
                </div>
            </div>
        </footer>
    );
};

const socialLink = ({ icon: Icon }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary/20 hover:text-primary transition-all">
        <Icon className="w-5 h-5" />
    </a>
);

const footerLink = ({ children, path }) => (
    <a href={path} className="hover:text-primary transition-colors cursor-pointer capitalize">
        {children}
    </a>
);

export default Footer;
