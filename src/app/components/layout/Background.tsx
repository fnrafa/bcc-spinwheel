"use client";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {PiSparkleFill} from "react-icons/pi";

interface LayoutProps {
    children: React.ReactNode;
}

const starCount = 12;

const getRandomPosition = () => ({
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    scale: Math.random() * 1.8 + 0.4,
});

const Background: React.FC<LayoutProps> = ({children}) => {
    const [stars, setStars] = useState<{ id: number; position: any; delay: number }[]>([]);

    useEffect(() => {
        setStars(
            Array.from({length: starCount}, (_, i) => ({
                id: i,
                position: getRandomPosition(),
                delay: Math.random() * 2 * 3,
            }))
        );
    }, []);

    return (
        <div
            className="flex flex-col bg-gradient-to-br from-background via-blue-500/50 to-background relative overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute text-blue-300"
                    style={star.position}
                    animate={{y: [0, -10, 0]}}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: star.delay,
                        ease: "easeInOut",
                    }}
                >
                    <PiSparkleFill size={20 * star.position.scale}/>
                </motion.div>
            ))}
            {children}
        </div>
    );
};

export default Background;
