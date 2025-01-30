import { Config } from "tailwindcss"

const config: Config = {
  presets: [
    require('@arthur.eudeline/starbucks-tp-kit/tailwind/preset')
  ],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee : {
					// Will be use for text-coffee for instance
          DEFAULT: "#463F3A",
          50: "#fcf9f4",
          100: "#e6e2de",
          200: "#bab6b3",
          300: "#D7BDA2",
          400: "#9c9a98",
          500: "#B68554",
          600: "#73675F",
          700: "#5C534C",
          800: "#463F3A",
          900: "#272321",
          950: "#181614",
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;