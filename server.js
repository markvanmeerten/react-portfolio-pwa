import express from 'express'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 4173
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Serve the production build from dist/
app.use(express.static(path.join(__dirname, 'dist')))

// /api/avatar — generates a random seed and proxies the DiceBear SVG response.
// Every request gets a different avatar, which demonstrates runtime caching:
// online = new avatar each refresh, offline = last cached avatar shown.
app.get('/api/avatar', (req, res) => {
  const seed = Math.random().toString(36).slice(2)
  const url = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`

  https.get(url, (dicebearRes) => {
    res.setHeader('Content-Type', 'image/svg+xml')
    // No-cache on the server response so the SW always decides caching behavior
    res.setHeader('Cache-Control', 'no-store')
    dicebearRes.pipe(res)
  }).on('error', () => {
    res.status(502).send('Could not reach DiceBear API')
  })
})

// Fallback: serve index.html for all other routes (SPA support)
app.get('*path', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Demo server running at http://localhost:${PORT}`)
})
