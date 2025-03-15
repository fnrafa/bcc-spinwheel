import React from "react";

interface ButtonProps {
    icon?: React.ReactNode;
    text?: string;
    variant?: "filled" | "outline";
    size?: "small" | "large";
    onClick?: () => void;
    fullWidth?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
                                           icon,
                                           text,
                                           variant = "filled",
                                           size = "large",
                                           onClick,
                                           fullWidth = false,
                                           className,
                                           type = "button",
                                       }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300
                ${variant === "filled"
                ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md hover:brightness-110"
                : "border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"}
                ${fullWidth ? "w-full" : "w-fit"} ${className}
                ${size === "small" ? "px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm" : "px-4 py-2 text-sm md:text-base"}
            `}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {text && <span>{text}</span>}
        </button>
    );
};

export default Button;
