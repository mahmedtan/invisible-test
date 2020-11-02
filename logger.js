const chalk = require("chalk");

module.exports = (key, val) => {
  console.log(
    `${chalk.bgWhite.black(` ${key}: `)} ${chalk.bgGreenBright.black(
      ` ${val} `
    )}`
  );
};
