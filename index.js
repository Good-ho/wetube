import express from "express";

// const express = require('express')
const app = express()
const port = 3000


const handleProfile = (req, res) =>{
    res.send("This is profile");
}

app.get('/', (req, res) => {
  res.send('Hello World !!!')
})

app.get("/profile", handleProfile);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})