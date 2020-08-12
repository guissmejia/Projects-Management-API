const express = require('express');
const EmployeesService = require('../services/employees-services');

function employeesAPI(app) {
  const router = express.Router();
  app.use('/api/employees', router);

  const employeesService = new EmployeesService();

  //1 GET
  router.get('/', async function (req, res, next) {
    const { project } = req.query;
    try {
      const employees = await employeesService.getEmployees({ project });

      res.status(200).json({
        data: employees,
        message: 'Employees listed',
      });
    } catch (err) {
      next(err);
    }
  });

  //1 GET id
  router.get('/:employeeId', async function (req, res, next) {
    const { employeeId } = req.params;
    try {
      const employees = await employeesService.getEmployee({ employeeId });

      res.status(200).json({
        data: employees,
        message: 'Employee retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  //2 POST
  router.post('/', async function (req, res, next) {
    const { body: employee } = req;
    try {
      const createEmployeeId = await employeesService.createEmployee({
        employee,
      });

      res.status(201).json({
        data: createEmployeeId,
        message: 'Employee created',
      });
    } catch (err) {
      next(err);
    }
  });

  //3 PUT
  router.put('/:employeeId', async function (req, res, next) {
    const { body: employee } = req;
    const { employeeId } = req.params;
    try {
      const updatedEmployeeId = await employeesService.updateEmployee({
        employeeId,
        employee,
      });

      res.status(200).json({
        data: updatedEmployeeId,
        message: 'Employee updated',
      });
    } catch (err) {
      next(err);
    }
  });

  //4 DELETE
  router.delete('/:employeeId', async function (req, res, next) {
    const { employeeId } = req.params;
    try {
      const deletedEmployeeId = await employeesService.deleteEmployee({
        employeeId,
      });

      res.status(200).json({
        data: deletedEmployeeId,
        message: 'Employee deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = employeesAPI;
