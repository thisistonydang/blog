import { describe, expect, it } from "vitest";

import { get_error_message } from "./get-error-message";

describe("get_error_message", () => {
  const promise = new Promise(() => {
    setTimeout(() => null);
  });

  it.each([
    ["new Error", new Error("new Error")],
    ["string", "string"],
    ["7", 7],
    ["[object Object]", { wut: "is this" }],
    ["null", null],
    ["[object Promise]", promise],
    ["undefined", undefined],
  ])("converts error thrown (%s) into a string", (expected, error) => {
    // GIVEN Errors of unknown type.

    // WHEN get_error_message is called with thrown error.
    let actual_message = "";
    try {
      throw error;
    } catch (e: unknown) {
      actual_message = get_error_message(e);
    }

    // THEN Error is converted to a string.
    expect(actual_message).to.equal(`Error: ${expected}`);
  });
});
