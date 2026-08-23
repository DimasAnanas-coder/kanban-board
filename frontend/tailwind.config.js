/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                thirdary: 'rgb(var(--color-thirdary) / <alpha-value>)',

                text: 'rgb(var(--color-text) / <alpha-value>)',
                accentText: 'rgb(var(--color-accent-text) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',

                accentHover: 'rgb(var(--color-accent-hover) / <alpha-value>)',

                error: 'rgb(var(--color-error) / <alpha-value>)',
                ok: 'rgb(var(--color-ok) / <alpha-value>)',
            },
        },
    },
    plugins: [],
};
