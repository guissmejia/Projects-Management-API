const MongoLib = require('../lib/mongo');

class ProjectsService {
  constructor() {
    this.collection = 'projects';
    this.mongoDB = new MongoLib();
  }
  
  async getProjects({ project }) {
    const query = project && { project: { $in: project }};
    const projects = await this.mongoDB.getAll(this.collection, query);
    return projects || [];
  }

  async getProject({ projectId }) {
    const project = await this.mongoDB.get(this.collection, projectId)
    return project || {};
  }

  async createProject({ project }) {
    const createProjectId = await this.mongoDB.create(this.collection, project);
    return createProjectId;
  }

  async updateProject({ projectId, project } = {}) {
    const updatedProjectId = await this.mongoDB.update(this.collection, projectId, project);
    return updatedProjectId;
  }

  async deleteProject({ projectId }) {
    const deletedProjectId = await this.mongoDB.delete(this.collection, projectId)
    return deletedProjectId;
  }
}

module.exports = ProjectsService;