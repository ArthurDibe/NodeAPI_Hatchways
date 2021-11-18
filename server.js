////////////////////////////////////////////////////////////
//
//   File: server.js
//   Developer: Arthur Dibe
// 
//   HOW TO START:
//     1) npm install
//     2) npm start
//     
//   OBS: After starting the server, tests results outputs
//        are saved in a file called "testResults.txt"
//
////////////////////////////////////////////////////////////

const express = require("express")
const fetch = require('node-fetch');
const testAPI = require('./testSever.js')
const app = express()
// to parse the incoming requests
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
// ------------------------------

const HTTP_PORT = process.env.PORT || 3000

app.listen(HTTP_PORT,()=>{
    console.log(`[SERVER ON]: ${HTTP_PORT}`);
    console.log("--------------------------------------------")
})

// ROUTE 1
app.get("/api/ping",(req, res)=>{
    console.log("[SERVER ROUTE CALLED]: /api/ping")
    res.status(200).json({success: true})
})

