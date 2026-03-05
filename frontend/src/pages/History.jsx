import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getHistory } from '../services/api';
import { Clock, ExternalLink, ShieldCheck, ShieldAlert } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (error) {
                console.error("Failed to fetch history", error);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-extrabold flex items-center gap-3">
                        <Clock className="w-8 h-8 text-primary" />
                        Scan <span className="text-primary">History</span>
                    </h1>
                    <span className="text-zinc-500 text-sm">Last 50 Scans</span>
                </div>

                <div className="glass-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">URL</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Score</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Timestamp</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {history.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 flex justify-center">
                                            {item.prediction === 'Phishing' ? (
                                                <ShieldAlert className="w-5 h-5 text-accent" />
                                            ) : (
                                                <ShieldCheck className="w-5 h-5 text-success" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 max-w-md truncate text-zinc-300 font-mono text-xs">{item.url}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs px-2 py-1 rounded ${item.prediction === 'Phishing' ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'}`}>
                                                {item.probability}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-zinc-500">{item.timestamp}</td>
                                        <td className="px-6 py-4 text-right">
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {history.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-zinc-500 italic">No scan history available yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default History;
