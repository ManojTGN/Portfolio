/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode:"class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily:{
                portfolio: ['portfolio', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-fast': 'spin 0.5s linear infinite',
            },
            colors:{
                portfolio:{ 
                    50: "white",
                    100: "#c1c1c1",
                    300: "#a3a3a3",
                    400: "#868686",
                    500: "#6a6a6a",
                    600: "#505050",
                    700: "#373737",
                    900: "#1f1f1f",
                    950: "#030303"
                }
            }
        },
    },
    plugins: [],
};
