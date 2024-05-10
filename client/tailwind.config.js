/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      
    },
    colors:{
      'black': '#000',
      'white': '#ffffff',
      'main-gray': 'gray',
      'bg-light': '#f9f9f6',
      'primary': '#00893A',
      'soft-primary': '#DAE5DA',
      'bg-soft': '#EDF2EE',
      'secondary': '#E2B633',
      'hover': '#2C742F',
      'gris': '#ccc',
      'bg-gray': '#333333'
    },
    fontSize:{
      xs:'10px',
    }
  },
  plugins: [],
}

