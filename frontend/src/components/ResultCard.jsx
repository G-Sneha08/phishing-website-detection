import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldAlert, ShieldCheck, Info, Database,
    BarChart3, Globe, Lock, Unlock, Zap,
    ExternalLink, Copy, Check, AlertCircle,
    Calendar, Link2, Hash, Type
} from 'lucide-react';

const ResultCard = ({ result }) => {
    const [copied, setCopied] = useState(false);
    if (!result) return null;

    const isPhishing = result.prediction === 'Phishing';
    const confidence = parseFloat(result.probability.replace('%', ''));
    const riskLevel = isPhishing ? (confidence > 80 ? 'CRITICAL' : 'HIGH') : (confidence > 20 ? 'MEDIUM' : 'LOW');

    // Extract features for the "Analysis Details" section
    const features = result.features || {};

    const copyUrl = () => {
        navigator.clipboard.writeText(result.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8"
        >
            {/* Top Level Summary Card */}
            <div className={`glass-card p-1 relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 ${isPhishing ? 'bg-accent' : 'bg-success'}`} />
                <div className="bg-zinc-950/40 p-8 rounded-[15px] flex flex-col lg:flex-row items-center gap-12">

                    {/* Radial Risk Score */}
                    <div className="relative w-48 h-48 flex-shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                className="text-zinc-800"
                            />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray="282.7"
                                initial={{ strokeDashoffset: 282.7 }}
                                animate={{ strokeDashoffset: 282.7 - (282.7 * confidence) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={isPhishing ? 'text-accent' : 'text-success'}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-bold text-zinc-500 uppercase">Risk Score</span>
                            <span className="text-4xl font-black">{confidence.toFixed(1)}%</span>
                        </div>
                    </div>

                    <div className="flex-grow text-center lg:text-left">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                            <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 font-bold text-sm ${isPhishing ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'}`}>
                                {isPhishing ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                {result.prediction.toUpperCase()}
                            </div>
                            <div className={`px-4 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-xs font-bold tracking-widest ${isPhishing ? 'text-accent' : 'text-success'}`}>
                                {riskLevel} RISK
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 break-all flex items-center gap-3">
                            {result.url}
                            <button onClick={copyUrl} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white">
                                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </h2>

                        <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
                            {isPhishing
                                ? "This website shows strong indicators of phishing activity. We recommend immediate caution and avoiding any data entry."
                                : "No malicious patterns were detected for this URL. However, always remain vigilant and verify sources manually."
                            }
                        </p>
                    </div>

                    <div className="flex-shrink-0 flex lg:flex-col gap-3">
                        <a href={result.url} target="_blank" rel="noopener noreferrer" className="cyber-button-primary text-xs flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" /> Open Site
                        </a>
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cyber-button-outline text-xs">
                            New Scan
                        </button>
                    </div>
                </div>
            </div>

            {/* Detailed Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 1. Feature Analysis */}
                <div className="glass-card p-8">
                    <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Analysis Details
                    </h3>
                    <div className="space-y-6">
                        <metricRow icon={Type} label="URL Length" value={features.url_length} />
                        <metricRow
                            icon={features.has_https ? Lock : Unlock}
                            label="HTTPS Status"
                            value={features.has_https ? "Secure" : "Insecure"}
                            color={features.has_https ? "success" : "accent"}
                        />
                        <metricRow icon={Hash} label="Suspicious Words" value={features.suspicious_words_count} />
                        <metricRow icon={Globe} label="Subdomains" value={features.num_subdomains} />
                        <metricRow icon={Calendar} label="Domain Age" value="N/A" />
                        <metricRow icon={ShieldCheck} label="ML Confidence" value={`${confidence.toFixed(1)}%`} />
                    </div>
                </div>

                {/* 2. Explainable AI */}
                <div className="glass-card p-8 col-span-1 lg:col-span-2">
                    <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-secondary" />
                        AI Decision Factors
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                        {result.explanations.map((exp, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-zinc-400">{exp.feature}</span>
                                    <span className={exp.impact === 'Increases Risk' ? 'text-accent' : 'text-success'}>
                                        {exp.impact === 'Increases Risk' ? '+' : '-'}{Math.round(exp.strength * 100)}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${exp.strength * 100}%` }}
                                        className={`h-full ${exp.impact === 'Increases Risk' ? 'bg-accent' : 'bg-success'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4">
                        <Info className="w-5 h-5 text-primary flex-shrink-0" />
                        <p className="text-xs text-zinc-500 leading-normal italic">
                            The percentages shown represent the feature's influence on the final AI model prediction. Positive values increase phishing probability, while negative values decrease it.
                        </p>
                    </div>
                </div>

                {/* 3. Threat Intelligence Database Matches */}
                <div className="glass-card p-8 col-span-full">
                    <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                        <Database className="w-5 h-5 text-white/50" />
                        Threat Intelligence Databases
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {result.threat_intel.reports.map((report, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-zinc-950/50 border border-white/5 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600">{report.database}</span>
                                    {report.match ? (
                                        <AlertCircle className="w-4 h-4 text-accent" />
                                    ) : (
                                        <ShieldCheck className="w-4 h-4 text-success" />
                                    )}
                                </div>
                                <div>
                                    <div className={`text-sm font-bold ${report.match ? 'text-accent' : 'text-zinc-300'}`}>
                                        {report.match ? 'FLAGGED AS THREAT' : 'NO MATCH FOUND'}
                                    </div>
                                    <p className="text-[10px] text-zinc-500 mt-1 uppercase">Database Verification</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const metricRow = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-900 text-zinc-500 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                <Icon className="w-4 h-4" />
            </div>
            <span className="text-zinc-400 text-sm">{label}</span>
        </div>
        <span className={`text-sm font-bold ${color ? 'text-' + color : 'text-white'}`}>{value}</span>
    </div>
);

export default ResultCard;
