/* eslint-disable @typescript-eslint/no-var-requires */
try {
  require('dotenv').config();
} catch (err) {
  console.error(err);
}

//
// Imports
//
const fs = require('fs');
const { exec } = require('child_process');

//
// Helpers
//

// Loggers
const titleLogger = (title) =>
  console.log(`\n====================${title}====================\n`);
const byeLogger = () => console.log('\n👋 Bye!\n');
const successLogger = (message) => console.log(`\n✅ ${message}`);
const errorLogger = (error) => console.log(`\n❌ ${error}\n`);
const skippedLogger = (message) => console.log(`\n⏭️  ${message}`);

//
// Constants
//
const help = process.argv.includes('--help');
const dbName =
  resolveArg('name', process.env.DB_NAME, true) || process.env.DB_NAME;
const dbHost = resolveArg('host', process.env.DB_HOST) || 'localhost';
const dbPort = resolveArg('port', process.env.DB_PORT) || '3306';
const dbUsername = resolveArg('user', process.env.DB_USERNAME) || 'root';
const dbPassword = process.env.DB_PASSWORD;

/**
 * Used to resolve arguments passed to the script
 */
function resolveArg(name, defaultValue, required = false) {
  const argIndex = process.argv.indexOf(`--${name}`);

  if (argIndex === -1 && required) {
    errorLogger(`Argument --${name} is required`);
    process.exit(1);
  }

  return (argIndex > -1 && process.argv[argIndex + 1]) || defaultValue;
}

/**
 * Used to build path to the file
 */
function buildPathToFile(fileName) {
  const path = `${process.cwd()}/${fileName}`;

  try {
    if (!fs.existsSync(path)) {
      throw new Error();
    }
  } catch (error) {
    if (path.includes('dummies')) {
      skippedLogger('Dummies skipped');
      return null;
    }
    errorLogger(`File ${path} does not exist`);
    process.exit(1);
  }

  return path;
}

/**
 * Used to execute mysql script
 */
async function execute(command, successMessage) {
  return new Promise((resolve) => {
    (async () => {
      try {
        const child = await exec(command);

        child.stderr.on('data', (data) => {
          if (data && data.includes('ERROR')) {
            errorLogger(`Error: ${data}`);
            process.exit(1);
          }
        });

        child.on('close', () => {
          successLogger(successMessage);
          resolve();
        });
      } catch (err) {
        errorLogger(`Error: ${err && err.message}`);
        process.exit(1);
      }
    })();
  });
}

/**
 * Used to run mysql script
 */
async function run(fileName, databaseName, successMessage) {
  const path = buildPathToFile(fileName);

  if (path) {
    await execute(
      `mysql -u ${dbUsername} -p${dbPassword} -h ${dbHost} -P ${dbPort} ${databaseName} < ${path}`,
      `${successMessage} created`,
    );
  }
}

//
// Main
//

(async () => {
  if (help) {
    titleLogger('Help');
    console.log(`
      Usage: yarn db:install [options]

      Options:
        --help                  Show help
        --file <path>           Path to the file with sql script
        --database <name>       Database name
    `);
    byeLogger();
    process.exit(0);
  }

  titleLogger('Database installation');

  //
  // script
  //
  await run('database/scripts/database.sql', dbName, 'Database');
  await run('database/scripts/tables.sql', dbName, 'Tables');
  await run('database/scripts/basedata.sql', dbName, 'Base data');
  await run('database/scripts/dummies.sql', dbName, 'Dummies');

  byeLogger();
})();
