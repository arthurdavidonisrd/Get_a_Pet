const mongoose = require('../db/conn')

 const {Schema} = mongoose

 const Pet = mongoose.model(
    'Pet',
    new Schema({
        name: {
            name: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            createdAt: { type: Date, default: Date.now }
        },
        age: {
            type: Number,
            required: true
        },
        weight:{
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        available:{
            type: Boolean
        },
        user: Object,
        adopter: Object,
        
    }, {timestamps: true})
 )



module.exports = Pet