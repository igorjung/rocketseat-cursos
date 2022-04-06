const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

var requests = 0;

server.use((req, res, next) => {
  requests ++;
  console.log(`There is ${requests} requests until now`);

  return next();
});

function checkIdExists (req, res, next) {
  const project = projects.find(p => p.id == req.params.id);
  
  if(!project){
    return res.status(400).json({ error: 'Id does not exists'});
  }

  return next();
}

server.post('/projects', (req, res) => {
  const { id, title, tasks} = req.body;

  projects.push({id, title, tasks});

  return res.json(projects);

}) 

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project =  projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects)
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  
  const index = projects.findIndex(p => p.id == id);

  projects.splice(index, 1);

  return res.send();
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project =  projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
})

server.listen(3000);


