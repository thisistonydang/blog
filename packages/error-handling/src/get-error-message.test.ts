import { get_error_message } from "./get-error-message";
import { describe, expect, it } from "vitest";

describe("get_error_message", () => {
  const promise = new Promise(() => {
    setTimeout(() => null);
  });

  [
    { error: new Error("error message"), expectedMessage: "error message" },
    { error: "wtf", expectedMessage: "wtf" },
    { error: 7, expectedMessage: "7" },
    { error: { wut: "is this" }, expectedMessage: "[object Object]" },
    { error: null, expectedMessage: "null" },
    { error: promise, expectedMessage: "[object Promise]" },
    { error: undefined, expectedMessage: "undefined" },
  ].forEach(({ error, expectedMessage }) => {
    it("converts any thrown error into a string", () => {
      // GIVEN Errors of unknown type.

      // WHEN get_error_message is called with thrown error.
      let actual_message = "";
      try {
        throw error;
      } catch (e: unknown) {
        actual_message = get_error_message(e);
      }

      // THEN Error is converted to a string.
      expect(actual_message).to.equal(`Error: ${expectedMessage}`);
    });
  });
});
