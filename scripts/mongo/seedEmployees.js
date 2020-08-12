// DEBUG=app:* node scripts/mongo/seedEmployees.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:employees');
const MongoLib = require('../../lib/mongo');
const { employeesMock } = require('../../utils/mocks/employees');

async function seedEmployees() {
  try {
    const mongoDB = new MongoLib();

    const promises = employeesMock.map(async employee => {
      await mongoDB.create('employees', employee);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} employees have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedEmployees();
