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

// ROUTE 2
app.get("/api/posts", async (req, res)=> 
{
    
    const tags = req.query.tags
    const sortBy = req.query.sortBy || "id"
    const direction = req.query.direction || "asc"
    const sortOptions = ["id", "reads", "likes", "popularity"]
    const directOptions = ["asc", "desc"]
    let codeStatus = 400
    let respObj
    let responseAPI

    console.log(`[SERVER ROUTE CALLED]: /api/posts?tags=${tags}&sortBy=${sortBy}&direction=${direction}`)
    if(!tags){
        respObj = {error: "Tags parameter is required"}
    }
    else if(!sortOptions.find(option => option == sortBy)){
        respObj = {error: "sortBy parameter is invalid"}
    }
    else if(!directOptions.find(option => option == direction))
    {
        respObj = {error: "direction parameter is invalid"}
    } 
    else {
        let responses = [];
        const tagList = tags.split(',')
        // ------------- Fetch the posts from API - synchronize by using Promise.all and .map
        await Promise.all(tagList.map(async (tag) => 
            {
                const url = `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`
                const options = {
                    "method": "GET",
                }
                
                responseAPI = await fetch(url, options)
                .then(resp1 => resp1.json())
                
                responses.push(...responseAPI.posts)
            })
        )
        
        // ------------- Sort the Elements according sort by
        switch(sortOptions.findIndex(option=> option == sortBy)){
        case 0:
            // console.log("By ID")
            if(direction == "asc") 
                responses.sort((postA,postB) => postA.id - postB.id) // ascending
            else 
                responses.sort((postA,postB) => postB.id - postA.id) // descending
            
            break;
        case 1:
            // console.log("By READS")
            if(direction == "asc") 
                responses.sort((postA,postB) => postA.reads - postB.reads) // ascending
            else
                responses.sort((postA,postB) => postB.reads - postA.reads) // descending

            break;
        case 2:
            // console.log("By LIKES")
            if(direction == "asc") 
                responses.sort((postA,postB) => postA.likes - postB.likes) // ascending
            else
                responses.sort((postA,postB) => postB.likes - postA.likes) // descending
            
            break;
        case 3:
            // console.log("By POPULARITY")
            if(direction == "asc") 
                responses.sort((postA,postB) => postA.popularity - postB.popularity) // ascending
            else
                responses.sort((postA,postB) => postB.popularity - postA.popularity) // descending

            break;          
        }

        // ------------- Remove Repeated Objects
        // responses.sort((postA,postB) => postA.id - postB.id)
        var uniqueResponse = responses.reduce((first, second) => {
            if(!first.some(obj => obj.id === second.id)) {
              first.push(second);
            }
            return first;
        },[]);
        
       // set the response object
        codeStatus = 200
        respObj = {posts: uniqueResponse}
    }

    // response
    res.status(codeStatus).json(respObj)
})


// ROUTE 404 - route not found
app.use((req, res) => {
    res.status(404).json({error: "404 - Sorry can't find that route!"})
})