"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { LuClock } from "react-icons/lu";
import { motion } from "framer-motion";

const Header: React.FC = () => {
    const [history, setHistory] = useState<{ id: number; label: string; time: string }[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clearing, setClearing] = useState(false);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const historyRes = await fetch("/api/history");
            const itemsRes = await fetch("/api/loadItems");
            const historyData = await historyRes.json();
            const itemsData = await itemsRes.json();

            if (historyData.history && itemsData.items) {
                const formattedHistory = historyData.history.map((entry: { id: number; time: string }) => {
                    const item = itemsData.items.find((i: { id: number }) => i.id === entry.id);
                    return {
                        id: entry.id,
                        label: item ? item.label : `Unknown (${entry.id})`,
                        time: new Date(entry.time).toLocaleString(),
                    };
                });

                setHistory(formattedHistory);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
        setLoading(false);
    };

    const clearHistory = async () => {
        setClearing(true);
        try {
            await fetch("/api/history", { method: "DELETE" });
            setHistory([]);
        } catch (error) {
            console.error("Failed to clear history:", error);
        }
        setClearing(false);
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 md:px-8">
            <div className="flex items-center">
                <div className="relative w-16 h-10 md:w-24 md:h-16 lg:w-36 lg:h-20">
                    <Image src="/assets/bcc.png" alt="Logo" fill style={{ objectFit: "contain" }} />
                </div>
                <div className="relative w-20 h-10 md:w-28 md:h-16 lg:w-48 lg:h-20">
                    <Image src="/assets/partners.png" alt="Logo" fill style={{ objectFit: "contain" }} />
                </div>
            </div>

            <Button
                icon={<LuClock />}
                text="History"
                variant="filled"
                onClick={() => {
                    fetchHistory().then();
                    setShowModal(true);
                }}
                size="small"
            />

            {showModal && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[28rem]">
                        <h2 className="text-xl font-bold mb-4">Spin History</h2>

                        {loading ? (
                            <p className="text-gray-500 text-center">Loading...</p>
                        ) : history.length > 0 ? (
                            <div className="max-h-64 overflow-auto border rounded-md">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-2 text-left w-12">#</th>
                                        <th className="p-2 text-left">Label</th>
                                        <th className="p-2 text-right">Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {history.map((entry, index) => (
                                        <tr key={entry.id} className="border-t">
                                            <td className="p-2 text-left">{index + 1}</td>
                                            <td className="p-2 text-left">{entry.label}</td>
                                            <td className="p-2 text-right text-gray-500">{entry.time}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">No history available.</p>
                        )}

                        <div className="mt-4 flex justify-between">
                            <Button
                                text={clearing ? "Clearing..." : "Clear History"}
                                onClick={clearHistory}
                                size="small"
                            />
                            <Button text="Close" onClick={() => setShowModal(false)} size="small" />
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
