/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#EEEEEE',
                secondary: '#FFFFFF',
                thirdary: '#CCCCCC',

                text: '#000000',
                accentText: '#1D4ED8',
                accent: '#1D4ED8',

                accentHover: '#DBEAFE',

                error: '#DD2200',
                ok: '#22DD77',
            },
        },
    },
    plugins: [],
};
