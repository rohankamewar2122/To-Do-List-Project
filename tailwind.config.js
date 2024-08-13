/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    //these lines mean that this config file will look into index.html & src directory which has any js,ts,jsx,tsx file for applying tailwindcss
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

