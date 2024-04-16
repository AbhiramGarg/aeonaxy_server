import express from "express"
import { config } from "dotenv"
import { connectdb } from "./db/db.js"
import createRoute from "./routes/signup.js"
import updateRoute from "./routes/prfloc.js"
import getRoute from "./routes/userdata.js"
import emailRoute from "./routes/test.js"
import cors from "cors"

const app = express()
config()
app.use(express.json()) 
app.use(cors())
const port = process.env.PORT || 5500
const toEmail = 'abhiramgargeia@gmail.com';



app.listen(port,async() => {
    await connectdb()
    console.log(`Server running on port: ${port}`)
    
})

app.use('/create',createRoute)
app.use('/update',updateRoute)
app.use('/get',getRoute)
app.use('/verify',emailRoute)