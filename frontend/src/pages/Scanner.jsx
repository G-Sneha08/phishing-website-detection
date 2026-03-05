import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UrlScanner from '../components/UrlScanner';
import ResultCard from '../components/ResultCard';
import { scanUrl } from '../services/api';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, BarChart } from 'lucide-react';

const Scanner = () => {
    const [result, setResult] = useState(null);

    const handleScan = async (url) => {
        try {
            const data = await scanUrl(url);
            setResult(data);
        } catch (error) {
            console.error("Scan failed", error);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
                    >
                        <Shield className="w-4 h-4" />
                        AI-Powered URL Security
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
                    >
                        Identify Threats in <span className="gradient-text">Real-Time.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg max-w-2xl mx-auto"
                    >
                        Leverage advanced machine learning models (Random Forest, XGBoost) to detect malicious URLs before they reach your data.
                    </motion.p>
                </div>

                <UrlScanner onScan={handleScan} />

                <ResultCard result={result} />

                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Zap}
                        title="Fast Inference"
                        description="Our model processes URLs in under 100ms, providing instant security feedback."
                    />
                    <FeatureCard
                        icon={BarChart}
                        title="Explainable AI"
                        description="Don't just trust a score. Understand WHY a URL was flagged with feature impact analysis."
                    />
                    <FeatureCard
                        icon={Lock}
                        title="Secure by Design"
                        description="Integrates PhishTank and Safe Browsing APIs for comprehensive threat coverage."
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="glass-card p-8 hover:bg-white/5 transition-colors group">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-zinc-500 leading-relaxed text-sm">
            {description}
        </p>
    </div>
);

export default Scanner;
