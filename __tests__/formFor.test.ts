import { test, expect } from "vitest";
import * as HexletCode from "../src/index";

test("empty form", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, {}, (_f) => {});
  expect(form).toBe('<form action="#" method="post"></form>');
});

test("empty form with url", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { url: "/users" }, (_f) => {});
  expect(form).toBe('<form action="/users" method="post"></form>');
});
