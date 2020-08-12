// DEBUG=app:* node scripts/mongo/seedProjects.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:projects');
const MongoLib = require('../../lib/mongo');
const { projectsMock } = require('../../utils/mocks/projects');

async function seedProjects() {
  try {
    const mongoDB = new MongoLib();

    const promises = projectsMock.map(async project => {
      await mongoDB.create('projects', project);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} projects have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedProjects();
