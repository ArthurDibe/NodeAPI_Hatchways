////////////////////////////////////
//   File: saveOutputs.js
//   Developer: Arthur Dibe
///////////////////////////////////

const fetch = require('node-fetch')
const chalk = require('chalk') // for display testing in color
const fs = require('fs'); // to save testing results in a file

const log = console.log // shorthand console.log

// function called from within testAPI function
const testRoute = async (testNumber, url)=> 
{
    const options = {
        "method": "GET",
    }
    responseTEST = await fetch(url, options).then(resp => resp.json())
    
    // result to append to file
    const result = `[TEST ${testNumber}] - ${url}\n
    RESPONSE: ${JSON.stringify(responseTEST, null, '\t')}\n\n`

    // Save result in the file
    fs.appendFile('output.txt', result, (err)=> {
        if (err) throw err;
    });
}


// Function called from server.js
module.exports = generateOutputs = async()=> 
{
    // RESET the file to start over
    fs.writeFile('output.txt', "",(err)=> {
        if(err) throw err;
    })

    // -----------> TEST 1 - 404 route not found 
    testRoute('1.1','http://localhost:3000/')
    testRoute('1.2','http://localhost:3000/postings')
    testRoute('1.3','http://localhost:3000/posts')
    testRoute('1.4','http://localhost:3000/api')
    testRoute('1.5','http://localhost:3000/posts/api')

    // TEST 2 - PING
    testRoute('2','http://localhost:3000/api/ping')

    // TEST 3 - /api/posts
    const tagsExist = "politics,tech,health,history,startups,science,design,culture"
    const tagsNotExist = "book,study,duty,paint,tv,warp,way,food"
    const sortOptions = ["id", "reads", "likes", "popularity"]
    const directOptions = ["asc", "desc"]

    // -----------> TEST 3.1 - no TAGS provided
    testRoute('3.1.1',`http://localhost:3000/api/posts`)
    testRoute('3.1.2',`http://localhost:3000/api/posts?tags`)
    sortOptions.forEach(option => testRoute('3.1.3',`http://localhost:3000/api/posts?tags&sortBy=${option}`))
    directOptions.forEach(option => testRoute('3.1.4',`http://localhost:3000/api/posts?tags&direction=${option}`))

    // -----------> TEST 3.2 - TAGS NOT EXIST
    testRoute('3.2.1',`http://localhost:3000/api/posts?tags=${tagsNotExist}`)
    sortOptions.forEach(option => testRoute('3.2.2',`http://localhost:3000/api/posts?tags=${tagsNotExist}&sortBy=${option}`))
    directOptions.forEach(option => testRoute('3.2.3',`http://localhost:3000/api/posts?tags=${tagsNotExist}&direction=${option}`))

    // -----------> TEST 3.3 - TAGS EXIST
    testRoute('3.3.1',`http://localhost:3000/api/posts?tags=${tagsExist}`)
    sortOptions.forEach(sortOpt => testRoute('3.3.2',`http://localhost:3000/api/posts?tags=${tagsExist}&sortBy=${sortOpt}&direction=asc`))
    sortOptions.forEach(sortOpt => testRoute('3.3.3',`http://localhost:3000/api/posts?tags=${tagsExist}&sortBy=${sortOpt}&direction=desc`))
}
