const express = require('express');
const ProjectsService = require('../services/projects-services');

function projectsAPI(app) {
  const router = express.Router();
  app.use('/api/projects', router);

  const projectsServices = new ProjectsService();

  //1 GET
  router.get('/', async function (req, res, next) {
    const { project } = req.query;
    try {
      const projects = await projectsServices.getProjects({ project });

      res.status(200).json({
        data: projects,
        message: 'Projects listed',
      });
    } catch (err) {
      next(err);
    }
  });

  //1 GET id
  router.get('/:projectId', async function (req, res, next) {
    const { projectId } = req.params;
    try {
      const projects = await projectsServices.getProject({ projectId });

      res.status(200).json({
        data: projects,
        message: 'Project retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  //2 POST
  router.post('/', async function (req, res, next) {
    const { body: project } = req;
    try {
      const createProjectId = await projectsServices.createProject({
        project,
      });

      res.status(201).json({
        data: createProjectId,
        message: 'Project created',
      });
    } catch (err) {
      next(err);
    }
  });

  //3 PUT
  router.put('/:projectId', async function (req, res, next) {
    const { body: project } = req;
    const { projectId } = req.params;
    try {
      const updatedProjectId = await projectsServices.updateProject({
        projectId,
        project,
      });

      res.status(200).json({
        data: updatedProjectId,
        message: 'Project updated',
      });
    } catch (err) {
      next(err);
    }
  });

  //4 DELETE
  router.delete('/:projectId', async function (req, res, next) {
    const { projectId } = req.params;
    try {
      const deletedProjectId = await projectsServices.deleteProject({
        projectId,
      });

      res.status(200).json({
        data: deletedProjectId,
        message: 'Project deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = projectsAPI;
