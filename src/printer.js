import chalk from "chalk";

const newLine = () => console.log(" ");

const header = (title) => {
  console.log(chalk.bold.underline(title));
  newLine();
};

const subheader = (title) => console.log(title);

const footer = () => newLine();

export { newLine, header, subheader, footer };
