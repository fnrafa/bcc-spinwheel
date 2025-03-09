import type {Config} from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "#3598DB",
                brandBlue: "#008DD5",
                brandOrange: "#FF7E00"
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        }
    },
    plugins: []
};

export default config;
