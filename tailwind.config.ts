/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                yellowcard: '#FFCD2E',
                redcard: '#E35E5A',
            },
        },
    },
    plugins: [],
}
