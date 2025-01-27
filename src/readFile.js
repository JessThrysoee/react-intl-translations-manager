import { readFileSync } from "node:fs";

function readFile(filename) {
  try {
    return readFileSync(filename, "utf8");
  } catch (err) {
    return undefined;
  }
}

export { readFile };
