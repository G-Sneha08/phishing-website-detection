import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileJson, CheckCircle2, AlertCircle } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';

const UploadDataset = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        try {
            await uploadDataset(formData);
            setUploadComplete(true);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold mb-4">Batch <span className="text-primary">URL Analysis</span></h1>
                    <p className="text-zinc-400 mb-12">Upload a CSV dataset containing URLs for bulk phishing detection.</p>

                    <label className="glass-card p-12 text-center border-2 border-dashed border-zinc-800 hover:border-primary/50 transition-colors cursor-pointer group block">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            accept=".csv,.txt"
                            disabled={isUploading}
                        />
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <UploadIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Select Dataset File</h3>
                        <p className="text-zinc-500 mb-8">CSV or TXT files supported (max 50MB)</p>
                        <div className="cyber-button-primary inline-block">
                            {isUploading ? 'Processing...' : 'Upload & Analyze'}
                        </div>
                    </label>

                    {uploadComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 p-6 rounded-2xl bg-success/10 border border-success/20 flex items-center gap-4"
                        >
                            <CheckCircle2 className="w-6 h-6 text-success" />
                            <div>
                                <h4 className="font-bold text-success">Analysis Complete</h4>
                                <p className="text-zinc-400 text-sm">Successfully analyzed 120 URLs. Results available in Analytics dashboard.</p>
                            </div>
                        </motion.div>
                    )}

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                            <FileJson className="w-6 h-6 text-secondary mb-4" />
                            <h4 className="font-bold mb-2">CSV Format</h4>
                            <p className="text-sm text-zinc-500">Ensure your CSV has a column named 'url' containing the full website addresses.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                            <AlertCircle className="w-6 h-6 text-accent mb-4" />
                            <h4 className="font-bold mb-2">Limits</h4>
                            <p className="text-sm text-zinc-500">Free tier allows up to 500 URLs per batch scan. Pro users have unlimited scans.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UploadDataset;
