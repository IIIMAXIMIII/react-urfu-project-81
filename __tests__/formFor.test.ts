import { test, expect } from "vitest";
import * as HexletCode from "../src/index";
import { readFileSync } from "node:fs";

const normalizeHtml = (html: string): string =>
  html.replace(/\r\n?/g, "\n").replace(/>\s+</g, "><").trim();

const readFixture = (name: string): string =>
  normalizeHtml(readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), "utf8").trim());

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

test("form with inputs", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name");
    f.input("job", { as: "textarea" });
  });
  expect(form).toBe(readFixture("form-with-inputs.html"));
});

test("form with inputs with attributes", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, {}, (f) => {
    f.input("name", { class: "user-input" });
    f.input("job");
  });
  expect(form).toBe(readFixture("form-with-inputs-with-attributes.html"));
});

test("form with inputs with default vals", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, {}, (f) => f.input("job", { as: "textarea" }));
  expect(form).toBe(readFixture("form-with-inputs-with-default-vals.html"));
});

test("form with inputs with vals", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { url: "#" }, (f) =>
    f.input("job", { as: "textarea", rows: 50, cols: 50 }),
  );
  expect(form).toBe(readFixture("form-with-inputs-with-vals.html"));
});

test("form with inputs field does not exist", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  expect(() =>
    HexletCode.formFor(template, { url: "/users" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.input("age");
    }),
  ).toThrow("Field 'age' does not exist in the template.");
});
