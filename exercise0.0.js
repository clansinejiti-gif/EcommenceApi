import express from 'express'
import Router from 'express'
import 'dotenv/config'
const app = express();
const router = Router();
app.use(express.json())
const port = process.env.PORT
const ports = Number(port)  || 3001

router.get('/', (req, res) => {
    return res.json({message: "Welcome Dude"})
})

router.get('/health', (req, res) => {
    return res.status(200).json({message: "Ok"})
})

router.get('/about', (req, res) => {
    return res.json({name: "REST API", version: "v1.0.0.0"})
})

app.listen(ports, () => {
    console.log(`Server is running: http://localhost:${port}`)
})