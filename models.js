'use strict';

const mongoose = require("mongoose");

//this is the schema to represent a books blog
const booksBlogSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author:  { type: String, required: true},
    created: {type: Date, default: Date.now}
});

booksBlogSchema.virtual('authorName').get(function() {
    //concatenate first and last name
    return `${this.author.firstName } ${this.author.lastName}`.trim();
});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
booksBlogSchema.methods.serialize = function(){
    return {
        title: this.title,
        author: this.author,
        content: this.content,
        created: this.created
    };
};

// all instance methods and virtual properties on our schema must be defined *before* we make the call to `.model`.

const BooksBlog = mongoose.model("BooksBlog", booksBlogSchema);

module.exports = { BooksBlog };