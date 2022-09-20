import { getErrorMessage } from "./get-error-message";
import { describe, expect, it } from "vitest";

describe("getErrorMessage", () => {
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

      // WHEN getErrorMessage is called with thrown error.
      let actualMessage = "";
      try {
        throw error;
      } catch (e: unknown) {
        actualMessage = getErrorMessage(e);
      }

      // THEN Error is converted to a string.
      expect(actualMessage).to.equal(`Error: ${expectedMessage}`);
    });
  });
});
