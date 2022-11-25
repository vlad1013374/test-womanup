const {Schema, model, ObjectId} = require("mongoose")


const ToDo = new Schema({
    task: {type: String, required: true},
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

module.exports = model('ToDo', ToDo)