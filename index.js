#!/usr/bin/env node

// if (process.argv[2] === "generate") {
//   console.log("Generated");
// }

const program = require("commander");
const clipboardy = require("clipboardy");
const chalk = require("chalk");
const log = console.log;
const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

program.version("1.0.0").description("Simple Password Generator");

// program
//   .command("generate")
//   .action(() => {
//     console.log("Generated");
//   })
//   .parse();

program
  .option("-l, --length <number>", "length of password", "8")
  .option("-s, --save", "save password to passwords.txt")
  .option("-nn, --no-numbers", "remove numbers")
  .option("-ns, --no-symbols", "remove symbols")
  .parse();

const { length, save, numbers, symbols } = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Save to the file
if (save) {
  savePassword(generatedPassword);
}

//Copy to the clipboard
clipboardy.writeSync(generatedPassword);

// Output generated password
log(chalk.blue("Generated Password: ") + chalk.bold(generatedPassword));
log(chalk.yellow("Password Copied to the clipboard"));
