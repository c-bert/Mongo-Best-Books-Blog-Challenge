'use strict';

const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    text: String,
    created: {type: Date, default: Date.now},
    author: String
});
//this is the schema to represent a books blog post
const booksBlogSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
    created: {type: Date, default: Date.now},
    comments: [commentsSchema]
});

booksBlogSchema.pre('find', function(next) {
    //author here is referencing author on line 9
    this.populate('author');
    next();
  });

booksBlogSchema.virtual('authorName').get(function() {
    //concatenate first and last name
    return `${this.author.firstName } ${this.author.lastName}`.trim();
});

// this is an *instance method* which will be available on all instances of the model. This method will be used to return an object that only
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

//this is the schema to represent authors
const AuthorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
});
//serialize the userName
AuthorSchema.methods.serialize = function(){
    return {
        userName: `${this.firstName}.${this.lastName}`
    }
};

const BooksBlog = mongoose.model("Blogpost", booksBlogSchema);
//this will create a collection in Robo3T defined as "authors"
const Author = mongoose.model("Author", AuthorSchema);

module.exports = { BooksBlog, Author };
