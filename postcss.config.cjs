module.exports = {
    plugins: {
        // Tailwind v4 uses a separate PostCSS adapter package. The adapter
        // `@tailwindcss/postcss` needs to be installed (done via npm) and
        // referenced here so PostCSS can run Tailwind correctly.
        "@tailwindcss/postcss": {},
        autoprefixer: {},
    },
};
