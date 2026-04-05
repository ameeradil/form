const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const cssTemplate = fs.readFileSync('app.css', 'utf-8')
const htmlTemplate = fs.readFileSync('index.html', 'utf-8')


app.get('/form', (req,res)=>{
    res.send(htmlTemplate)
})

app.listen(8000, 'localhost', ()=>{
    console.log('Your App is running in port 8000')
})