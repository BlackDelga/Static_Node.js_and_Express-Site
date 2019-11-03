//Require dependecies
const express = require('express');
const path = require('path');
const data = require('./data.json');
const projects = data.projects;

//setting express aplication and assign to app
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

//creating a router

//this is my hoempage
app.get('/', (req, res) => {
  res.render('index', { projects, });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project', (req, res) => {
  res.render('project/0');
});

//renders each project page based on pug template
app.get('/project/:id', (req, res, next) => {
  const {
    id,
  } = req.params;
  if ((id >= 0 && id <= 4) && isNaN(id) === false) {
    const project = projects[id];
    res.render('project', {
      project,
      id,
    });
  } else {
    next();
  }
});

// Creating new error
app.use((req, res, next) => {
  const err = new Error('There has been an error!');
  err.status = 404;
  next(err);
});

//using that error to display error pug template
app.use((err, req, res, next) => {
  res.status(err.status);
  err.message = 'There has been an error';
  res.locals.error = err;
  if (res.status = 404) {
    console.log(`${req.path} is not a valid path`);
  }

  res.render('error');
});

//here we listen to the 3000 port
app.listen(5000, () => {
  console.log('port on localhost:5000');
});
