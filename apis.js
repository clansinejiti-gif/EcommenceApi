import express from 'express'
import 'dotenv/config'

import connectToDatabase from './db/db.js'
import itemsRouter from './routes/ex2.route.js'
import productsRouter from './routes/e_coomencProductRoute.js'
import ordersRoute from './routes/e.ccommenceOrderRoute.js'


const app = express();

app.use(express.json())

app.use('/api/v1/items', itemsRouter)

app.use('/api/products', productsRouter)

app.use('/api/orders', ordersRoute)

app.get('/', (req, res)=> {
    res.send("Welcome to Clansine's first Backend Deployed on render");
});


await connectToDatabase;
const port1 = process.env.PORT;
const port = parseInt(port1)
try{const server = app.listen(port, '0.0.0.0', () => {
    console.log(`CRUD API is running on http://localhost:${port}`)
});
    server.on('error', (err) =>{
        console.log("Server Error: ",err.message)
    });
} catch (error) {
    console.error(err.message)
}

export default app;