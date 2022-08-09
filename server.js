const express = require('express')  //Tell the server to use express
const app = express()               //Set app equal to express to simplify the sintaxis.
const PORT = 8000  //Set the port to 8000


const countries = {
    argentina:{
    "name": "Argentina",
    "short": "ar",
    "dir": `../public/flags/ar.png`},

    uruguay:{
        "name": "Uruguay",
        "short": "uy",
        "dir": `../public/flags/uy.png`},
    
    blank:{
            "name": "blank",
            "short": "None",
            "dir": `../public/flags/vz.png`},
}

app.get('/', (request, response)=>{  //First we need to get an HTML file. That's what the root is telling us. Then we have a request and a response.
    response.sendFile(__dirname + '/index.html')      //I want the response to send a file. First we look for the file index.html in the same folder where the server.js file is. 
})

app.get('/api/:countryName', (request, response)=>{
    const countryReq = request.params.countryName.toLowerCase()
    if(countries[countryReq]){
        response.json(countries[countryReq])
    }else{
        response.json(countries['blank'])
    }
    

})

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}!`)

})