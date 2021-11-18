////////////////////////////////////
//   File: testServer.js
//   Developer: Arthur Dibe
///////////////////////////////////

const fetch = require('node-fetch')
const chalk = require('chalk') // for display testing in color
const fs = require('fs'); // to save testing results in a file

const log = console.log // shorthand console.log
const green = chalk.bold.green // alians for chalk.green
const magenta = chalk.bold.magenta // alians for chalk.magenta

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

    // result on console window
    log()
    log(`[${green(`TEST ${testNumber}`)}] - ${magenta(url)}`)
    log("RESPONSE: ",responseTEST)

    // Save result in the file
    fs.appendFile('testResults.txt', result, (err)=> {
        if (err) throw err;
        log('Saved!');
    });
}



