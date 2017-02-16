const express = require('express');
const fs = require('fs');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient

const app = express();
const port = (process.env.PORT || 3002);
app.set('port', port);
app.use(bodyParser.json());

var mongoURI = 'mongodb://root:database1@localhost:27017/test';
 if (process.env.NODE_ENV === 'production') {
  mongoURI = 'mongodb://root:database1@ds054999.mlab.com:54999/masks_db';
 }

MongoClient.connect(mongoURI, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port, () => {
    console.log('listening on 3002')
  })
})

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/hello', (req, res) => {
  res.status(200).json({"msg": "Hello world!"});
});

app.get('/api/characterSheets', (req, res) => {
  var sheets = db.collection('characterSheets').find().toArray(function(err, results) {
    res.json(results);
  })
})

app.post('/api/characterSheets', (req, res) => {
  var query = {'cId': req.body.cId};
  var update = req.body;
  var opts = {upsert: true};
  db.collection('characterSheets').update(query, update, opts, (err, result) => {
    err ? res.status(500).json({error: err}) : res.status(200).json({cId: req.body.cId});
  })
})

app.put('/api/characterSheets', (req, res) => {
  var query = {'cId': req.body.cId};
  var update = req.body;
  var opts = {};
  db.collection('characterSheets').update(query, update, opts, (err, result) => {
    err ? res.status(500).json({error: err}) : res.status(200).json({cId: req.body.cId});
  })
})

app.delete('/api/characterSheets', (req, res) => {
  var query = {'cId': req.body.cId};
  db.collection('characterSheets').findOneAndDelete(query, (err, result) => {
    err ? res.status(500).json({error: err}) : res.status(200).json({cId: req.body.cId});
  })
})
