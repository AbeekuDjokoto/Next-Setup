import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: {
        DEFAULT: 'var(--black)',
        100: 'var(--black-100)',
        200: 'var(--black-200)',
      },
      blue: {
        DEFAULT: 'var(--blue)',
        100: 'var(--blue-100)',
      },
      borderColor: 'var(--border-color)',
      red: {
        DEFAULT: 'var(--red)',
        100: 'var(--red-100)',
      },
      white: {
        DEFAULT: 'var(--white)',
        100: 'var(--white-100)',
      },
    },
  },
  plugins: [],
};
export default config;
