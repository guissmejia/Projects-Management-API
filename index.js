const express = require('express');
const app = express();
const { config } = require('./config/index');

const employeesAPI = require('./routes/employees-routes');
const projectsAPI = require('./routes/projects-routes');

//body parser
app.use(express.json());

employeesAPI(app);
projectsAPI(app);


app.listen(config.port, function(){
  console.log(`listening http://localhost:${config.port}`);
})
