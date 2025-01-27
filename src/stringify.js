import stableStringify from "json-stable-stringify";
import { compareByKey } from "./compareByKey";

function stringify(value, { replacer = null, space = 2, sortKeys = true, trailingNewline = false }) {
  return (
    (sortKeys
      ? stableStringify(value, { replacer, space, cmp: compareByKey })
      : JSON.stringify(value, replacer, space)) + (trailingNewline ? "\n" : "")
  );
}

export { stringify };
