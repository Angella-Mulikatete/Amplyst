import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // For Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}",    // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",      // If you use src directory
  ],
  theme: {
    extend: {
      colors: {
        // Use hsl(var(--color)) to reference your CSS variables
        // primary: {
        //   100: 'hsl(var(--primary-100) / <alpha-value>)',
        //   500: 'hsl(var(--primary-500) / <alpha-value>)',
        //   600: 'hsl(var(--primary-600) / <alpha-value>)',
        //   700: 'hsl(var(--primary-700) / <alpha-value>)',
        // },
        gray: {
          900: 'rgb(17 24 39 / <alpha-value>)', // Tailwind will replace <alpha-value> with opacity
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7cd4fc',
          400: '#3abddc',
          500: '#0ea5e9',
          600: '#0369a1',
          700: '#0b5e8e',
          800: '#084d70',
          900: '#075985',
          950: '#062c4a',
        },
        secondary: {
          100: 'hsl(var(--secondary-100) / <alpha-value>)',
          500: 'hsl(var(--secondary-500) / <alpha-value>)',
        },
        // Add more as needed
      },
       textColor: {
        primary: {
          100: '#e0f2fe',
          700: '#0b5e8e',
        },
      },
      backgroundImage: {
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-primary': 'linear-gradient(135deg, #3A7CA5 0%, #2E6384 100%)',
        'gradient-hero': 'var(--gradient-hero)',
        // Add more as needed
      },
    borderColor: {
      primary: {
        DEFAULT: '#0ea5e9',
        100: '#e0f2fe',
        700: '#0b5e8e'
      }
    }
    },
  },
  plugins: [],
}
export default config




