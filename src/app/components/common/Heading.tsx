import React from "react";

interface HeadingProps {
    text: string;
    size?: number;
}

const Heading: React.FC<HeadingProps> = ({text, size = 24}) => {
    return (
        <h1 className="relative text-center tracking-widest font-extrabold leading-none">
            <span
                className="absolute inset-0 text-white"
                style={{
                    WebkitTextStroke: "8px white",
                    color: "transparent",
                    fontSize: `clamp(32px, 5vw, ${size}px)`,
                }}
            >
                {text}
            </span>
            <span
                className="relative text-orange-400"
                style={{fontSize: `clamp(32px, 5vw, ${size}px)`}}
            >
                {text}
            </span>
        </h1>
    );
};

export default Heading;
