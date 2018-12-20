const mongoose = require('mongoose');

// Mongoose internally uses a promise-like object,
// but it's better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const {PORT, DATABASE_URL} = require('./config');
const {BooksBlog} = require('./models');

const app = express();
app.use(express.json());

//GET request to /best-books-blog
app.get('/best-books-blog', (req, res) => {
    const filters = {};
    const queryableFields = ['title', 'content', 'author', 'created'];
    queryableFields.forEach(field => {
        if (req.query[field]){
            filters[field] = req.query[field];
        }
    })
});
    BooksBlog
        .find(filters)
        .then (data => res.json (
            //blog here is the variable
            //that's returned on our request
            data.map(blog => blog.serialize())
        ))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
 // can also request by ID
 app.get('/best-books-blog/:id', (req, res) => {
     BooksBlog
     .findbyId(req.params.id)
     .then (data => res.json (
        //blog here is the variable
        //that's returned on our request
        data.map(blog => blog.serialize())
    ))
    .catch(err => {
        console.error(err);
        res.status(500).json({message:'Internal sever error'})
    });
 });
 
 app.post('/best-books-blog', (req, res) => {
    const requiredFields  = ['title', 'content', 'author'];
    for (let i=0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    //use zip file
    BooksBlog.create({
        title: ,
        content: ,
        author: 

    })
        .then(data => res.status(201).json (data.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error"});
        });
 });

 app.put('/best-books-blog/:id', (req, res) => {
      // ensure that the id in the request path and the one in request body match
      if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
          const message = `Request path id (${req.params.id}) and request body id ` + `(${req.body.id}) must match`;
          console.error(message); 
          return res.status(400).json( {message:message})
      }

// we only support a subset of fields being updateable.
// if the user sent over any of the updatableFields, we udpate those values
// in document
      const toUpdate = {};
      const updateableFields = ['title', 'content', 'author'];

      updateableFields.forEach(field => {
     //The in operator returns true if the specified property is in the specified object or its prototype chain.     
          if (field in req.body) {
              toUpdate[field] = req.body[field];
          }
      });

      BooksBlog
      //all key/value paris in toUpdate will be updated (which is what `$set` does)
      .findByIDAndUpdate(req.params.id, { $set: toUpdate })
      .then(data => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error"}));
 });

 app.delete('/best-books-blog/:id', (req, res) => {
     BooksBlog.findByIDAndRemove(req.params.id)
     .then(data => res.status(204).end())
     .catch(err => res.status(500).json({ message: "Internal server error" }));
 });

 // catch-all endpoint if client makes request to non-existent endpoint
 //good router practice
app.use("*", function(req, res) {
    res.status(404).json({ message: "Not Found" });
  });