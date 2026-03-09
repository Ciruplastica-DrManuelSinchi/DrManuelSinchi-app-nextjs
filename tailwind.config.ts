import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colores del wireframe Ciruplástica
      colors: {
        primary: {
          DEFAULT: '#391142',
          light: '#5a2d6a',
          dark: '#1f0a24',
          50: '#f9f7fa',
          100: '#f3eef5',
          200: '#e8dcea',
          300: '#d4c5d9',
          400: '#b299bb',
          500: '#8f6d9a',
          600: '#6d4a7a',
          700: '#5a2d6a',
          800: '#391142',
          900: '#1f0a24',
        },
        accent: {
          DEFAULT: '#d4a853',
          light: '#f0e0b8',
          dark: '#b8944d',
          50: '#fdf9ef',
          100: '#f9f0d9',
          200: '#f0e0b8',
          300: '#e5c987',
          400: '#d4a853',
          500: '#c99a3a',
          600: '#b8944d',
          700: '#967530',
          800: '#7a5d29',
          900: '#654c24',
        },
        dark: '#1a1a1a',
        light: '#f9f7fa',
      },

      // Fuentes del wireframe
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },

      // Espaciados personalizados
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      // Border radius personalizados
      borderRadius: {
        '4xl': '2rem',
      },

      // Sombras personalizadas
      boxShadow: {
        'soft': '0 4px 20px rgba(57, 17, 66, 0.08)',
        'medium': '0 10px 40px rgba(57, 17, 66, 0.12)',
        'strong': '0 10px 60px rgba(57, 17, 66, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.12)',
      },

      // Animaciones
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },

      // Gradientes como backgrounds
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #391142 0%, #1f0a24 100%)',
        'cta-gradient': 'linear-gradient(135deg, #d4a853 0%, #b8944d 100%)',
        'light-gradient': 'linear-gradient(180deg, #f9f7fa 0%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
}

export default config