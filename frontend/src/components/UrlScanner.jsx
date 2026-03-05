import React, { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UrlScanner = ({ onScan }) => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setIsScanning(true);
        await onScan(url);
        setIsScanning(false);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-1">
                    <div className="pl-4 pr-2 text-zinc-500">
                        <LinkIcon className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Enter website URL to scan (e.g., https://secure-bank-login.com)"
                        className="flex-grow bg-transparent border-none text-zinc-100 py-4 px-2 focus:ring-0 placeholder:text-zinc-600"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isScanning || !url}
                        className="cyber-button-primary h-full py-3 px-8 flex items-center gap-2"
                    >
                        {isScanning ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Search className="w-5 h-5" />
                        )}
                        <span className="hidden sm:inline">{isScanning ? 'Analyzing...' : 'Scan Now'}</span>
                    </button>
                </div>
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-zinc-400 text-sm">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    <span>Real-time ML Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-primary" />
                    <span>XAI Explanations</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                    <Search className="w-4 h-4" />
                    <span>Threat Intel Check</span>
                </div>
            </div>
        </div>
    );
};

export default UrlScanner;
