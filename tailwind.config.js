/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#FFFFFF',
          text: '#000000',
          button: '#007BFF',
        },
        secondary: {
          border: '#757575',
          card: '#F5F5F5',
          accent: '#28A745',
          text: '#666666',
        }
      },
      spacing: {
        'gap': '16px',
        'card-padding': '12px',
        'card-padding-lg': '16px',
        'outer-margin': '24px',
      },
      borderRadius: {
        'system': '4px',
      }
    },
  },
  plugins: [],
}