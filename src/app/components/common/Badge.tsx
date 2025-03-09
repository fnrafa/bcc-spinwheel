import React from "react";

interface BadgeProps {
    text: string;
    size?: number
}

const Badge: React.FC<BadgeProps> = ({text, size = 16}) => {
    return (
        <h2
            className="text-white font-semibold text-center rounded-full border border-white w-fit"
            style={{
                fontSize: `clamp(${size * 0.8}px, ${size}px, ${size * 1.2}px)`,
                padding: `clamp(${size * 0.2}px, ${size * 0.3}px, ${size * 0.4}px) clamp(${size * 0.4}px, ${size * 0.6}px, ${size * 0.8}px)`, // Auto padding
            }}
        >
            {text}
        </h2>
    );
};

export default Badge;
