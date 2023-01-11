import { describe, expect, it } from "vitest";

import { cm_to_imperial } from "./cm_to_imperial";

describe("cm_to_imperial", () => {
  it.each([
    [152, `5'0"`],
    [154, `5'0.5"`],
    [157, `5'2"`],
    [158, `5'2"`],
    [162, `5'4"`],
    [169, `5'6.5"`],
    [175, `5'9"`],
    [183, `6'0"`],
    [188, `6'2"`],
  ])("%s cm -> %s", (height_cm, height_imperial) => {
    // GIVEN height in centimeters.

    // WHEN converted to imperial.

    // THEN expected height string in feet and inches is returned.
    expect(cm_to_imperial(height_cm)).to.equal(height_imperial);
  });
});
