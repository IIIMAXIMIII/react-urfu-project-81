import { expect, test } from "vitest";
import HexletCode from "../src/index";

test("default export provides formFor", () => {
  expect(typeof HexletCode.formFor).toBe("function");
});
