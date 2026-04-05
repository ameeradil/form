// Thing I learned from this project

// First: If your HTML uses CSS, the browser loads CSS as a separate request.
// You must serve static files (like CSS) using express.static(__dirname).
// Reading CSS with fs is not needed unless you manually send it.

// Second: To use environment variables, install dotenv and call require('dotenv').config() at the top.
// The .config() only work if your file was just <.env> otherwise you should give  apath
// The .env file must be in the root folder and use correct syntax (no spaces around =).


// Requrie core Modules
const fs = require('fs')
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 


// Create the Database
const DB = process.env.DATABASE
mongoose.connect(DB).then(()=>{
    console.log('DB connected successfully')
}).catch(err => console.log('DB connection error:', err))

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    fullname: String,
    lastEducation: String,
    materialstatus: String,
    message: String
})

const User = mongoose.model('User', userSchema)

const htmlTemplate = fs.readFileSync('index.html', 'utf-8')

// Serve all static files (CSS, JS, images)
app.use(express.static(__dirname))


app.get('/form', (req,res)=>{
    res.send(htmlTemplate)
})

app.post('/form', async (req,res)=>{
    try{
        const newUser = await User.create(req.body)
        res.status(201).redirect('/form')
        alert('The from has been submited')
    }catch(err){
        res.status(500).send('Erro Saving User')
    }
})

app.listen(3000, 'localhost', ()=>{
    console.log('Your App is running in port 3000')
})