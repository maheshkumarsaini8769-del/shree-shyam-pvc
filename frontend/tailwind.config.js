/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#FAF8F5',   // Warm alabaster / ivory
          100: '#F3F0EA',  // Warm limestone light
          200: '#E6E2D8',  // Warm architectural hairline border
          300: '#CBC5B8',
          400: '#9E998D',
          500: '#7A756B',
          600: '#5C574F',
          700: '#3E3A34',
          800: '#22211F',  // Warm graphite
          850: '#1C1B1A',
          900: '#171615',  // Warm architectural smoked ebony
          950: '#0E0D0C',  // Deepest matte black
        },
        obsidian: {
          DEFAULT: '#121212', // Pure warm architectural black
          dark: '#0A0A0A',    // Deepest ebony
          light: '#171615',   // Warm smoked charcoal card surface
          muted: '#252422'    // Warm stone border / surface
        },
        charcoal: {
          DEFAULT: '#1E1D1B', // Warm matte graphite
          light: '#363431',   // Warm basalt stone
          muted: '#7A756B',   // Warm muted editorial text
          subtle: '#A8A49C'   // Warm alabaster secondary text
        },
        luxury: {
          gold: '#C5A059',       // Refined architectural brass gold
          goldLight: '#DFBA73',  // Champagne warm gold
          goldDark: '#9A7734',   // Deep antique bronze
          goldBg: '#FAF8F5',     // Warm limestone cream
          bronze: '#7A5B37',
          cream: '#F5F3EE',
          card: '#FFFFFF'
        },
        brand: {
          primary: '#121212',
          accent: '#C5A059',
          red: '#B91C1C',
          emerald: '#15803D'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
        'elevated': '0 12px 32px -4px rgba(15, 23, 42, 0.08)',
        'floating': '0 24px 48px -12px rgba(15, 23, 42, 0.16)',
        'gold-glow': '0 8px 24px -4px rgba(197, 154, 51, 0.35)'
      },
      maxWidth: {
        'content': '1320px',
        'reading': '65ch'
      }
    },
  },
  plugins: [],
}
