import React, { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UrlScanner = ({ onScan }) => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setIsScanning(true);
        // Add a slight artificial delay for "AI thinking" feel if it's too fast
        const startTime = Date.now();
        await onScan(url);
        const endTime = Date.now();
        const duration = endTime - startTime;
        if (duration < 1500) {
            await new Promise(resolve => setTimeout(resolve, 1500 - duration));
        }
        setIsScanning(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
                {/* Dynamic Gradient Border */}
                <div className={`absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-60 ${isScanning ? 'animate-pulse opacity-50' : ''}`}></div>

                <div className="relative flex flex-col md:flex-row items-center bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden p-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center flex-grow w-full">
                        <div className="pl-6 pr-3 text-zinc-500">
                            <LinkIcon className="w-5 h-5 text-primary/60" />
                        </div>
                        <input
                            type="text"
                            placeholder="Paste website URL to verify (e.g., https://safe-secure-bank.co)"
                            className="flex-grow bg-transparent border-none text-zinc-100 py-5 px-2 focus:ring-0 placeholder:text-zinc-600 text-lg font-medium outline-none"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isScanning || !url}
                        className="w-full md:w-auto cyber-button-primary h-full py-4 px-10 flex items-center justify-center gap-3 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden relative"
                    >
                        {isScanning ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                                <span className="font-bold tracking-wider">SECURE SCANNING...</span>
                                <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full animate-progress-fast" />
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5 group-hover:text-amber-300 transition-colors" />
                                <span className="font-bold tracking-wider">SCAN WEBSITE</span>
                                <ArrowIcon />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Quick Stats/Features below scanner */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-zinc-500">
                <div className="flex items-center gap-2.5 hover:text-success transition-colors cursor-default group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-success/10 group-hover:text-success transition-all">
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Real-time ML</span>
                </div>
                <div className="flex items-center gap-2.5 hover:text-primary transition-colors cursor-default group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Low Latency</span>
                </div>
                <div className="flex items-center gap-2.5 hover:text-secondary transition-colors cursor-default group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-secondary/10 group-hover:text-secondary transition-all">
                        <Search className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Global Intel</span>
                </div>
            </div>
        </div>
    );
};

const ArrowIcon = () => (
    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

export default UrlScanner;
