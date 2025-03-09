"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Image from "next/image";
import { useSpinContext } from "@/context/SpinContext";
import { IoSend } from "react-icons/io5";

const SpinWheel: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const spinFnRef = useRef<() => void>(() => {});
    const { items, setItems, cheatItemId, removeAfterSelect } = useSpinContext();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
            const data = items;

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

            arcs.append("path")
                .attr("d", arc)
                .attr("fill", (d, i) => orangeColors[i % 2])
                .style("stroke", "#fff")
                .style("stroke-width", "2px");

            arcs.append("text")
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
                    .duration(4000)
                    .attrTween("transform", function () {
                        const i = d3.interpolate(oldRotation, rotation);
                        return (t) => "rotate(" + i(t) + ")";
                    })
                    .each("end", function () {
                        d3.select(`.slice:nth-child(${finalIndex + 1}) path`).attr("fill", "#008DD5");
                        setSelectedItem(data[finalIndex].label);
                        oldRotation = rotation;
                        if (removeAfterSelect) {
                            setItems((prev) => prev.filter((item) => item.id !== data[finalIndex].id));
                        }
                    });
            };
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, [items, cheatItemId, removeAfterSelect, setItems]);

    return (
        <div className="relative flex flex-col items-center w-full z-10">
            <div className="text-xl font-semibold mb-4 h-8 text-white">
                {selectedItem ? `${selectedItem} Chosen!` : ""}
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
                    className="absolute flex items-center justify-center w-[20vw] h-[20vw] max-w-50 max-h-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <button
                        onClick={() => spinFnRef.current()}
                        disabled={items.length <= 1}
                        className={`w-full h-full md:px-16 rounded-full border-8 border-white bg-white flex items-center justify-center transition-transform duration-150 focus:outline-none 
                            ${items.length <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
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
        </div>
    );
};

export default SpinWheel;
