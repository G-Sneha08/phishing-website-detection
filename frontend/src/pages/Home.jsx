import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Search, Zap, Lock, BarChart3, Clock,
    ChevronRight, ArrowRight, ShieldCheck, ShieldAlert,
    Globe, Database, Server, Smartphone, Cpu,
    Github, Mail, ExternalLink, Info, Copy, Check,
    AlertTriangle, MousePointer2, Settings, FileSearch, HelpCircle,
    LayoutDashboard
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UrlScanner from '../components/UrlScanner';
import ResultCard from '../components/ResultCard';
import { scanUrl, getHistory, getAnalytics } from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale, LinearScale, BarElement,
    ArcElement, Title, Tooltip, Legend
);

const Home = () => {
    const [scanResult, setScanResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({
        total_scans: 0,
        phishing_count: 0,
        safe_count: 0,
        accuracy: '94.2%'
    });
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoadingStats(true);
        try {
            const [historyData, analyticsData] = await Promise.all([
                getHistory(),
                getAnalytics()
            ]);
            setHistory(historyData);
            setStats(analyticsData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoadingStats(false);
        }
    };

    const handleScan = async (url) => {
        try {
            const data = await scanUrl(url);
            setScanResult(data);
            fetchData(); // Refresh history/analytics after scan
        } catch (error) {
            console.error("Scan failed", error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const barData = {
        labels: ['Safe', 'Phishing'],
        datasets: [{
            label: 'URL Scans',
            data: [stats.safe_count, stats.phishing_count],
            backgroundColor: ['rgba(16, 185, 129, 0.6)', 'rgba(244, 63, 94, 0.6)'],
            borderColor: ['#10b981', '#f43f5e'],
            borderWidth: 1,
        }],
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false } },
            x: { grid: { display: false } }
        }
    };

    return (
        <div className="bg-background text-zinc-100 min-h-screen font-sans selection:bg-primary/30">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8 backdrop-blur-md"
                    >
                        <Shield className="w-3.5 h-3.5" />
                        AI-POWERED THREAT INTELLIGENCE
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]"
                    >
                        AI Powered <span className="gradient-text">Phishing</span> <br />
                        Website Detection
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Protect your digital perimeter with advanced machine learning.
                        Detect malicious URLs and spoofed domains in milliseconds.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto mb-4"
                    >
                        <UrlScanner onScan={handleScan} />
                    </motion.div>
                    <p className="text-zinc-600 text-sm italic">
                        Enter a URL to check if it is phishing or safe.
                    </p>
                </div>
            </section>

            {/* 2. How It Works Section */}
            <section id="how-it-works" className="py-24 relative bg-zinc-950/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">How It <span className="text-primary">Works</span></h2>
                        <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <StepCard
                            step="01"
                            icon={MousePointer2}
                            title="Enter URL"
                            desc="User enters the suspicious website URL into our system."
                        />
                        <StepCard
                            step="02"
                            icon={Cpu}
                            title="Feature Extraction"
                            desc="Backend parses HTML, URL structure, and SSL certificates."
                        />
                        <StepCard
                            step="03"
                            icon={Settings}
                            title="ML Analysis"
                            desc="Random Forest & XGBoost models analyze 30+ features."
                        />
                        <StepCard
                            step="04"
                            icon={ShieldCheck}
                            title="Return Result"
                            desc="System delivers a risk score and security verdict."
                        />
                    </div>
                </div>
            </section>

            {/* 3. Live Scanner Results Section */}
            <AnimatePresence>
                {scanResult && (
                    <section id="scanner-results" className="py-24 bg-background scroll-mt-24">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-2xl md:text-4xl font-bold">Analysis <span className="text-primary">Report</span></h2>
                                <button
                                    onClick={() => copyToClipboard(scanResult.url)}
                                    className="cyber-button-outline text-xs flex items-center gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied URL' : 'Copy URL'}
                                </button>
                            </div>
                            <ResultCard result={scanResult} />
                        </div>
                    </section>
                )}
            </AnimatePresence>

            {/* 4. Threat Analytics Dashboard */}
            <section id="analytics" className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Threat Analytics</h2>
                            <p className="text-zinc-500 max-w-md">Real-time statistics of global threats detected by our AI engines.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">
                                <span className="text-zinc-500">Live Status:</span> <span className="text-success inline-flex items-center gap-1.5 ml-1"><div className="w-2 h-2 rounded-full bg-success animate-pulse" /> Online</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <StatCard title="Total Scanned" value={stats.total_scans} icon={Globe} color="white" />
                        <StatCard title="Phishing Detected" value={stats.phishing_count} icon={ShieldAlert} color="accent" />
                        <StatCard title="Safe Websites" value={stats.safe_count} icon={ShieldCheck} color="success" />
                        <StatCard title="Detection Accuracy" value={stats.accuracy} icon={Cpu} color="secondary" />
                    </div>

                    <div className="glass-card p-1">
                        <div className="bg-zinc-950/50 p-8 rounded-[15px]">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                Detection Statistics
                            </h3>
                            <div className="h-80 w-full">
                                <Bar data={barData} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Scan History Section */}
            <section id="history" className="py-24 bg-zinc-950/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                            <Clock className="w-8 h-8 text-primary" />
                            Recent <span className="text-primary">Scans</span>
                        </h2>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-zinc-500">
                            <FileSearch className="w-3.5 h-3.5" />
                            Live Logs
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 bg-zinc-900/50">
                                        <th className="px-6 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">Verdict</th>
                                        <th className="px-6 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">URL</th>
                                        <th className="px-6 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">Risk Score</th>
                                        <th className="px-6 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">Timestamp</th>
                                        <th className="px-6 py-5 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {history.slice(0, 10).map((item, idx) => (
                                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {item.prediction === 'Phishing' ? (
                                                        <div className="flex items-center gap-2 text-accent text-xs font-bold">
                                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                                            PHISHING
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-success text-xs font-bold">
                                                            <div className="w-2 h-2 rounded-full bg-success" />
                                                            SAFE
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate text-zinc-400 font-mono text-xs">{item.url}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-grow h-1.5 bg-zinc-800 rounded-full w-20 overflow-hidden">
                                                        <div
                                                            className={`h-full ${item.prediction === 'Phishing' ? 'bg-accent' : 'bg-success'}`}
                                                            style={{ width: item.probability }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium">{item.probability}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-zinc-500">{item.timestamp}</td>
                                            <td className="px-6 py-4 text-right">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-600 hover:text-white transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Security Awareness Section */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 uppercase tracking-tighter italic">Know the <span className="text-primary">Threats</span></h2>
                        <p className="text-zinc-500">Understanding common phishing techniques is the first step to online safety.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <AwarenessCard
                            title="Fake Login Pages"
                            icon={Lock}
                            desc="Malicious clones of popular sites (Bank, Gmail, Facebook) designed to capture your credentials."
                        />
                        <AwarenessCard
                            title="Email Phishing"
                            icon={Mail}
                            desc="Messages pretending to be from trusted sources with urgent requests to click fraudulent links."
                        />
                        <AwarenessCard
                            title="Domain Spoofing"
                            icon={Globe}
                            desc="Using look-alike characters (e.g., g00gle.com) to trick users into visiting wrong domains."
                        />
                        <AwarenessCard
                            title="Shortened URLs"
                            icon={ChevronRight}
                            desc="Masked malicious links behind bit.ly or other shorteners to hide the true destination."
                        />
                    </div>
                </div>
            </section>

            {/* 7. Features Section */}
            <section className="py-24 bg-zinc-950/30 overflow-hidden relative">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Elite Protection <br /> <span className="text-primary italic">Standard</span></h2>
                            <p className="text-zinc-400 text-lg mb-12">
                                Our platform isn't just a scanner—it's a comprehensive security suite combining state-of-the-art AI with global threat intelligence.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                                <FeatureItem icon={ShieldCheck} title="ML Detection" desc="Advanced Random Forest & XGBoost." />
                                <FeatureItem icon={Zap} title="Real-time Scanning" desc="Instant results under 100ms." />
                                <FeatureItem icon={Cpu} title="Feature Extraction" desc="30+ website parameters analyzed." />
                                <FeatureItem icon={BarChart3} title="Threat Analytics" desc="Live monitoring dashboard." />
                                <FeatureItem icon={Clock} title="History Tracking" desc="Comprehensive audit logs." />
                                <FeatureItem icon={Server} title="Flask API" desc="Modern high-performance backend." />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="glass-card p-2">
                                <img
                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
                                    alt="Cybersecurity"
                                    className="rounded-[15px] grayscale hover:grayscale-0 transition-all duration-700 opacity-60"
                                />
                                <div className="absolute -bottom-6 -left-6 glass-card p-6 border-primary/20 bg-zinc-950/90 max-w-[200px]">
                                    <h4 className="text-primary font-bold text-lg mb-1">99.2%</h4>
                                    <p className="text-zinc-500 text-xs">Model Detection accuracy on test datasets.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Tech Stack Section */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-12 uppercase tracking-widest text-zinc-500">Built with Industrial Tech</h2>
                    <div className="flex flex-wrap justify-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-1000">
                        <TechLogo name="HTML5" icon={Globe} />
                        <TechLogo name="CSS3" icon={LayoutDashboard} />
                        <TechLogo name="JavaScript" icon={Cpu} />
                        <TechLogo name="React" icon={ArrowRight} />
                        <TechLogo name="Flask" icon={Server} />
                        <TechLogo name="Python" icon={Cpu} />
                        <TechLogo name="Scikit-Learn" icon={BarChart3} />
                        <TechLogo name="JSON" icon={Database} />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

// Sub-components
const StepCard = ({ step, icon: Icon, title, desc }) => (
    <div className="glass-card p-8 relative group hover:border-primary/30 transition-all duration-300">
        <div className="absolute top-4 right-6 text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors">
            {step}
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`glass-card p-6 border-b-2`} style={{ borderBottomColor: `var(--${color === 'white' ? 'border' : color})` }}>
        <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</span>
            <div className={`p-2 rounded-lg bg-white/5`}>
                <Icon className={`w-4 h-4 text-${color === 'white' ? 'zinc-300' : color}`} />
            </div>
        </div>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
    </div>
);

const AwarenessCard = ({ title, icon: Icon, desc }) => (
    <div className="glass-card p-6 border-l-2 border-primary/20 hover:border-primary transition-all group">
        <Icon className="w-8 h-8 text-primary/40 group-hover:text-primary mb-4 transition-colors" />
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
    </div>
);

const FeatureItem = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h4 className="font-bold text-sm mb-1">{title}</h4>
            <p className="text-zinc-500 text-xs">{desc}</p>
        </div>
    </div>
);

const TechLogo = ({ name, icon: Icon }) => (
    <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all">
        <Icon className="w-8 h-8 text-zinc-600" />
        <span className="text-xs font-medium text-zinc-500">{name}</span>
    </div>
);

export default Home;
