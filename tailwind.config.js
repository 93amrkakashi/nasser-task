/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#121212', 
        'text': '#E0E0E0', 
        'primary': '#BB86FC', 
        'secondary': '#03DAC6', 
        'danger': '#CF6679', 
      },

    },
  },
  plugins: [],
}
