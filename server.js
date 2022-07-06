const express = require('express')  //I'm using express, so I require expresss
const app = express()  //Instead of typing express, I'm typing app
const PORT = 8000
const cors = require('cors')

app.use(cors())

const countries ={
    "argentina":{
        "name":"argentina",
        "continent":"South America",
        "capitalCity":"Buenos Aires"
    },

     "brazil":{
        "name":"brazil",
        "continent":"South America",
        "capitalCity":"Brasilia"
    },

     "uruguay":{
        "name":"uruguay",
        "continent":"South America",
        "capitalCity":"Montevideo"
    },

    "unknown":{
        "name":"unknown",
        "continent":"South America",
        "capitalCity":"Montevideo"
    }
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + "/index.html")
})

app.get('/api/:country', (request,response)=>{
    const countryName = request.params.country.toLowerCase()
    if (countries[countryName]){
    response.json(countries[countryName])
    }else{
        response.json(countries["unknown"])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is now running smoothly on port ${PORT}, like democracy.`)
})