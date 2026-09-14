// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/',
//   resolve: {
//     alias: [
//       {
//         find: "@",
//         replacement: path.resolve(__dirname, "./src"),
//       },
//     ],
//   },
//   plugins: [react()],
// })



import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
