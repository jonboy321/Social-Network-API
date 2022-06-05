const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtPost: {
            type: String,
            required: true,
            
        },
        createdAt: {
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;