const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reaction: {
            type
        }
    }
)