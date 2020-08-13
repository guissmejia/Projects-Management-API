const express = require('express');
const app = express();
const { config } = require('./config/index');

const employeesAPI = require('./routes/employees-routes');
const projectsAPI = require('./routes/projects-routes');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

//body parser
app.use(express.json());

employeesAPI(app);
projectsAPI(app);

//Catch 404
app.use(notFoundHandler);

//Error middleware
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function(){
  console.log(`listening http://localhost:${config.port}`);
})