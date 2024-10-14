/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-bgImage': "url('./src/assets/images/background_image.png')",
        'motion-white-logo': "url('./src/assets/images/logo_white.png')"
        // 'motion-white-logo': "url('')"
      },
    },
  },
  plugins: [],
}