import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#261708',
        silver: '#ACADB2',
        secondary: '#EB8C2A',
        tertiary: '#754515',
        yell: '#FFE663',
        brown: '#6B3C24'
      },
      backgroundImage: {
        'town-hall': "url('/backgrounds/bg-town-hall.png')",
        'mint': "url('/backgrounds/bg-altar.png')",
      }
    },
  },
  plugins: [],
};
export default config;
