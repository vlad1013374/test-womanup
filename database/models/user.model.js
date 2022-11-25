const {Schema, model, ObjectId} = require("mongoose")


const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "ToDo"
    }]
})

module.exports = model('User', User)