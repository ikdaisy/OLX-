import express from "express"
import env from "dotenv"
import Connection from "./connection.js"
import router from "./router.js"

env.config()

const app=express()



app.use(express.static('front-end'))

app.use(express.json({limit:'500Mb'}))

app.use("/api",router)

Connection().then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`Server running at http://localhost:${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})


