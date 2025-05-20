// server.js
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())

const cards = [
    { question: "2+2", answer: "4", isRemembered: false },
    { question: "Capital of France", answer: "Paris", isRemembered: false },
    { question: "JS framework?", answer: "React", isRemembered: false }
]

app.get('/cards', (req, res) => {
    res.json(cards)
})

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
