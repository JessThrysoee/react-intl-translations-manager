import { readFileSync } from "node:fs";
import Path from "node:path";
import { sync as globSync } from "glob";

// FormatJS default format (https://formatjs.github.io/docs/getting-started/message-extraction/) is:
//
//   {
//     "foo_ok": {
//       description: "Ok text",
//       defaultMessage: "OK",
//     },
//     "foo_cancel":{
//       description: "Cancel text",
//       defaultMessage: "Cancel",
//     }
//   }
//
// TO:
//
// const files = [
//   {
//     path: 'src/components/Foo.json',
//     descriptors: [
//       {
//         id: 'foo_ok',
//         description: 'Ok text',
//         defaultMessage: 'OK',
//       },
//       {
//         id: 'foo_cancel',
//         description: 'Cancel text',
//         defaultMessage: 'Cancel',
//       },
//     ],
//   },
// ];

function readFormatJsDefaultFormatMessageFiles(messagesDirectory) {
  if (!messagesDirectory || typeof messagesDirectory !== "string" || messagesDirectory.length === 0) {
    throw new Error("messagesDirectory is required");
  }

  const EXTRACTED_MESSAGES_DIR = Path.join(messagesDirectory, "/");
  const EXTRACTED_MESSAGES = Path.join(EXTRACTED_MESSAGES_DIR, "**/*.json");

  return globSync(EXTRACTED_MESSAGES)
    .map((filename) => ({
      path: filename.substring(EXTRACTED_MESSAGES_DIR.length),
      descriptors: Object.entries(JSON.parse(readFileSync(filename, "utf8"))).map(([id, descriptor]) => ({
        id,
        description: descriptor.description,
        defaultMessage: descriptor.defaultMessage,
      })),
    }))
    .filter((file) => file.descriptors.length > 0);
}

export { readFormatJsDefaultFormatMessageFiles };
