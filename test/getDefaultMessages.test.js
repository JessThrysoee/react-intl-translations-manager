import assert from "node:assert";
import { describe, it } from "node:test";
import { getDefaultMessages } from "../src/getDefaultMessages.js";

describe("getDefaultMessages", () => {
  it("should throw an error if no files are passed", () => {
    const files = undefined;
    assert.throws(() => getDefaultMessages(files), Error);
  });

  it("should give back all default messages", () => {
    const result = getDefaultMessages([
      {
        path: "src/components/Button.json",
        descriptors: [
          {
            id: "button_text",
            defaultMessage: "Submit",
          },
          {
            id: "button_title",
            defaultMessage: "Click this button",
          },
        ],
      },
    ]);

    const expected = {
      duplicateIds: [],
      messages: {
        button_text: "Submit",
        button_title: "Click this button",
      },
    };

    assert.deepStrictEqual(result, expected);
  });

  it("should give back all default messages, and all duplicate keys", () => {
    const result = getDefaultMessages([
      {
        path: "src/components/Button.json",
        descriptors: [
          {
            id: "button_text",
            defaultMessage: "Submit",
          },
          {
            id: "button_title",
            defaultMessage: "Click this button",
          },
        ],
      },
      {
        path: "src/components/AnotherButton.json",
        descriptors: [
          {
            id: "button_text",
            defaultMessage: "Cancel",
          },
          {
            id: "button_title",
            defaultMessage: "Click this button to cancel",
          },
        ],
      },
    ]);

    const expected = {
      duplicateIds: ["button_text", "button_title"],
      messages: {
        button_text: "Cancel",
        button_title: "Click this button to cancel",
      },
    };

    assert.deepStrictEqual(result, expected);
  });
});
