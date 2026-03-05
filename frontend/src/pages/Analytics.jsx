import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { getAnalytics } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, ShieldAlert, Globe } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const [stats, setStats] = useState({
        total_scans: 0,
        phishing_count: 0,
        safe_count: 0,
        accuracy: '94.2%'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAnalytics();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    const barData = {
        labels: ['Safe', 'Phishing'],
        datasets: [
            {
                label: 'URL Scans',
                data: [stats.safe_count, stats.phishing_count],
                backgroundColor: ['rgba(16, 185, 129, 0.6)', 'rgba(244, 63, 94, 0.6)'],
                borderColor: ['#10b981', '#f43f5e'],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Safe', 'Phishing'],
        datasets: [
            {
                data: [stats.safe_count, stats.phishing_count],
                backgroundColor: ['rgba(16, 185, 129, 0.4)', 'rgba(244, 63, 94, 0.4)'],
                borderColor: ['#10b981', '#f43f5e'],
                borderWidth: 2,
                hoverOffset: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false } },
            x: { grid: { display: false } }
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
                <h1 className="text-4xl font-extrabold mb-12">Security <span className="text-secondary">Dashboard</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <StatCard title="Total Scanned" value={stats.total_scans} icon={Activity} color="white" />
                    <StatCard title="Phishing Detected" value={stats.phishing_count} icon={ShieldAlert} color="accent" />
                    <StatCard title="Safe URLs" value={stats.safe_count} icon={ShieldCheck} color="success" />
                    <StatCard title="Model Accuracy" value={stats.accuracy} icon={Globe} color="secondary" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold mb-8">Detection Statistics</h3>
                        <div className="h-64">
                            <Bar data={barData} options={options} />
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold mb-8">Risk Distribution</h3>
                        <div className="h-64 flex justify-center">
                            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="glass-card p-6 border-b-2" style={{ borderBottomColor: `var(--${color})`, borderColor: color === 'white' ? 'transparent' : '' }}>
        <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-500 text-sm font-medium">{title}</span>
            <div className={`p-2 rounded-lg bg-white/5`}>
                <Icon className={`w-5 h-5 ${color === 'white' ? 'text-zinc-200' : 'text-' + color}`} />
            </div>
        </div>
        <div className="text-3xl font-bold">{value}</div>
    </div>
);

export default Analytics;
