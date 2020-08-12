const MongoLib = require('../lib/mongo');

class EmployeesService {
  constructor() {
    this.collection = 'employees';
    this.mongoDB = new MongoLib();
  }
  
  async getEmployees({ project }) {
    const query = project && { project: { $in: project }};
    const employees = await this.mongoDB.getAll(this.collection, query);
    return employees || [];
  }

  async getEmployee({ employeeId }) {
    const employee = await this.mongoDB.get(this.collection, employeeId)
    return employee || {};
  }

  async createEmployee({ employee }) {
    const createEmployeeId = await this.mongoDB.create(this.collection, employee);
    return createEmployeeId;
  }

  async updateEmployee({ employeeId, employee } = {}) {
    const updatedEmployeeId = await this.mongoDB.update(this.collection, employeeId, employee);
    return updatedEmployeeId;
  }

  async deleteEmployee({ employeeId }) {
    const deletedEmployeeId = await this.mongoDB.delete(this.collection, employeeId)
    return deletedEmployeeId;
  }
}

module.exports = EmployeesService;