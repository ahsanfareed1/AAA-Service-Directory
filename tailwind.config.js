module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yelp-red': '#d32323',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}