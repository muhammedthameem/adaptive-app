import { defineConfig } from 'vite'
import includeHtml from 'vite-plugin-include-html'
import path from 'path'
import fs from 'fs'

const pagesDir = path.resolve(__dirname, 'src/pages')
let pageFiles = []
if (fs.existsSync(pagesDir)) {
  pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'))
}

const input = {
  main: path.resolve(__dirname, 'index.html'),
}

for (const file of pageFiles) {
  const name = file.replace('.html', '')
  input[name] = path.resolve(pagesDir, file)
}

export default defineConfig({
  root: '.',
  plugins: [
    includeHtml({
      include: path.resolve(__dirname, 'src/partials'),
      watch: true,
    }),
  ],
  server: {
    open: '/index.html',
    port: 5173,
  },
  build: {
    rollupOptions: {
      input,
    },
  },
})