import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Image from "next/image";
import { useSpinContext } from "@/context/SpinContext";
import { IoSend } from "react-icons/io5";
import { motion } from "framer-motion";

const SpinWheel: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const spinFnRef = useRef<() => void>(() => {});
    const { items, setItems, cheatItemId, setCheatItemId } = useSpinContext();
    const [selectedItemData, setSelectedItemData] = useState<{ id: number; label: string } | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        d3.select(chartRef.current).selectAll("*").remove();
        if (!items || items.length === 0) return;

        const updateSize = () => {
            const w = chartRef.current?.offsetWidth ?? 480;
            const h = w;
            const r = w / 2;
            let rotation = 0;
            let oldRotation = 0;

            const orangeColors = ["#fb923c", "#ea580c"];
            const data = items.filter(item => item.active);
            if (data.length === 0) return;

            const svg = d3
                .select(chartRef.current)
                .append("svg")
                .attr("viewBox", `0 0 ${w} ${h}`)
                .attr("preserveAspectRatio", "xMinYMin meet");

            const container = svg
                .append("g")
                .attr("transform", `translate(${w / 2},${h / 2})`);

            const vis = container.append("g");
            const pie = d3.layout.pie().sort(null).value(() => 1);
            const arc = d3.svg.arc().outerRadius(r);

            const arcs = vis
                .selectAll("g.slice")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "slice");

            arcs
                .append("path")
                .attr("d", arc)
                .attr("fill", (d, i) => orangeColors[i % 2])
                .style("stroke", "#fff")
                .style("stroke-width", "2px");

            arcs
                .append("text")
                .attr("transform", function (d) {
                    d.innerRadius = 0;
                    d.outerRadius = r;
                    const angle = (d.startAngle + d.endAngle) / 2;
                    return `rotate(${(angle * 180) / Math.PI - 90})translate(${r - 10})`;
                })
                .attr("text-anchor", "end")
                .text((d, i) => data[i].label)
                .style("fill", "white")
                .style("font-size", `${w * 0.025}px`);

            spinFnRef.current = () => {
                if (data.length <= 1) return;

                let finalIndex: number;
                if (cheatItemId !== null) {
                    finalIndex = data.findIndex((item) => item.id === cheatItemId);
                    if (finalIndex === -1) {
                        finalIndex = Math.floor(Math.random() * data.length);
                    }
                } else {
                    finalIndex = Math.floor(Math.random() * data.length);
                }

                const totalSlices = data.length;
                const sliceAngle = 360 / totalSlices;
                const randomTurns = 5;
                const finalAngle = 360 - sliceAngle * finalIndex - sliceAngle / 2;
                const targetRotation = 360 * randomTurns + finalAngle;
                rotation = oldRotation + targetRotation;

                vis.transition()
                    .duration(5000)
                    .attrTween("transform", function () {
                        const i = d3.interpolate(oldRotation, rotation);
                        return (t) => "rotate(" + i(t) + ")";
                    })
                    .each("end", function () {
                        const selected = data[finalIndex];
                        d3.select(`.slice:nth-child(${finalIndex + 1}) path`).attr("fill", "#008DD5");
                        setSelectedItemData({ id: selected.id, label: selected.label });
                        setShowModal(true);
                        oldRotation = rotation;
                        setTimeout(() => {
                            setShowModal(false);

                            const nextCheatItem = items
                                .filter(item => item.pinned && item.active && item.id !== selected.id)[0];

                            setCheatItemId(nextCheatItem ? nextCheatItem.id : null);
                            setItems(prev =>
                                [...prev]
                                    .map(item => ({
                                        ...item,
                                        active: item.id !== selected.id ? item.active : false,
                                    }))
                                    .sort((a, b) => {
                                        if (a.pinned && a.active && !(b.pinned && b.active)) return -1;
                                        if (b.pinned && b.active && !(a.pinned && a.active)) return 1;

                                        if (a.active && !b.active) return -1;
                                        if (b.active && !a.active) return 1;

                                        return 0;
                                    })
                            );
                        }, 5000);
                    });
            };
        };

        updateSize();
    }, [items, cheatItemId, setItems]);

    return (
        <div className="relative flex flex-col items-center w-full z-10">
            <div className="text-xl font-semibold mb-4 h-8 text-white">
                {selectedItemData ? `${selectedItemData.label} Chosen!` : ""}
            </div>
            <div className="relative flex items-center justify-center w-full">
                <div className="absolute top-[-1rem] flex items-center justify-center">
                    <IoSend
                        className="text-5xl rotate-90"
                        style={{
                            fill: "#FF7E00",
                            stroke: "white",
                            strokeWidth: "20px",
                        }}
                    />
                </div>
                <div ref={chartRef} className="flex items-center justify-center w-full h-auto" />
                <div
                    className="absolute flex items-center justify-center w-[20vw] h-[20vw] max-w-50 max-h-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <button
                        onClick={() => spinFnRef.current()}
                        disabled={items.filter(item => item.active).length <= 1}
                        className={`w-full h-full md:px-16 rounded-full border-8 border-white bg-white flex items-center justify-center transition-transform duration-150 focus:outline-none 
                    ${items.filter(item => item.active).length <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onMouseDown={(e) => (e.currentTarget as HTMLButtonElement).classList.add("scale-90")}
                        onMouseUp={(e) => (e.currentTarget as HTMLButtonElement).classList.remove("scale-90")}
                    >
                        <Image
                            src="/icon.png"
                            alt="Spin"
                            width={720}
                            height={720}
                            className="w-full h-full object-contain"
                        />
                    </button>
                </div>
            </div>

            {showModal && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <h2 className="text-xl font-bold">{selectedItemData?.label} Chosen!</h2>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default SpinWheel;
