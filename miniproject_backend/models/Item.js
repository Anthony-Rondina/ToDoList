const { Schema, model } = require('./connection')

const itemSchema = Schema({
    entry: {
        required: true,
        type: String
    },
    status: {
        type: String,
        required: true,
        default: "to-do",
        enum: ["to-do", "pending", "completed"]
    }
},
    {
        timestamps: true
    }
)

module.exports = model("Item", itemSchema)
