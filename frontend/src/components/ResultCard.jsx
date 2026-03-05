import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Info, Database, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const ResultCard = ({ result }) => {
    if (!result) return null;

    const isPhishing = result.prediction === 'Phishing';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
            {/* Main Status */}
            <div className={`col-span-1 glass-card p-8 border-t-4 ${isPhishing ? 'border-accent shadow-glow-accent/20' : 'border-success shadow-glow-primary/20'}`}>
                <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full mb-6 ${isPhishing ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'}`}>
                        {isPhishing ? <ShieldAlert className="w-12 h-12" /> : <ShieldCheck className="w-12 h-12" />}
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{result.prediction}</h2>
                    <p className="text-zinc-400 text-sm mb-6">Probability: {result.probability}</p>

                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: result.probability }}
                            className={`h-full ${isPhishing ? 'bg-accent' : 'bg-success'}`}
                        />
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-zinc-500 text-xs uppercase tracking-wider">Risk Level</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded bg-zinc-900 ${isPhishing ? 'text-accent' : 'text-success'}`}>
                                {isPhishing ? 'VERY HIGH' : 'LOW'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* XAI Explanations */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-6 text-white font-semibold">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <h3>Explainable AI Insights</h3>
                    </div>

                    <div className="space-y-4">
                        {result.explanations.map((exp, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-300 font-medium">{exp.feature}</span>
                                    <span className={exp.impact === 'Increases Risk' ? 'text-accent' : 'text-success'}>
                                        {exp.impact}
                                    </span>
                                </div>
                                <div className="relative h-1.5 bg-zinc-800/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(exp.strength * 100, 100)}%` }}
                                        className={`absolute inset-y-0 ${exp.impact === 'Increases Risk' ? 'bg-accent right-0 origin-right' : 'bg-success left-0'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Threat Intelligence */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-6 text-white font-semibold">
                        <Database className="w-5 h-5 text-secondary" />
                        <h3>Threat Intelligence Reports</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {result.threat_intel.reports.map((report, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-zinc-500 mb-1">{report.database}</p>
                                    <p className="text-sm font-medium">{report.match ? 'Flagged' : 'Clean'}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${report.match ? 'bg-accent shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-success'}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultCard;
