import chalk from "chalk";

import { compareByKey } from "./compareByKey";
import { newLine, subheader } from "./printer";

function printResults({ deleted, untranslated, added, sortKeys = true }) {
  if (!(deleted.length || added.length || untranslated.length)) {
    console.log(chalk.green("  Perfectly maintained, no remarks!"));
    newLine();
  } else {
    if (deleted.length) {
      const items = sortKeys ? deleted.sort(compareByKey) : deleted;
      subheader("Deleted keys:");
      for (const { key, message } of items) {
        console.log(`  ${chalk.red(key)}: ${chalk.cyan(message)}`);
      }
      newLine();
    }

    if (untranslated.length) {
      const items = sortKeys ? untranslated.sort(compareByKey) : untranslated;
      subheader("Untranslated keys:");
      for (const { key, message } of items) {
        console.log(`  ${chalk.yellow(key)}: ${chalk.cyan(message)}`);
      }
      newLine();
    }

    if (added.length) {
      const items = sortKeys ? added.sort(compareByKey) : added;
      subheader("Added keys:");
      for (const { key, message } of items) {
        console.log(`  ${chalk.green(key)}: ${chalk.cyan(message)}`);
      }
      newLine();
    }
  }
}

export { printResults };
