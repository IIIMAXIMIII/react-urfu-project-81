import { test, expect } from "vitest";
import { add } from "../src/index.js";

test("add function", () => {
  expect(add(1, 2)).toBe(3);
});
