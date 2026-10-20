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
  expect(form).toBe('<form method="post" action="#"></form>');
});

test("empty form with url", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { url: "/users" }, (_f) => {});
  expect(form).toBe('<form method="post" action="/users"></form>');
});

test("form with inputs", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name");
    f.input("job", { as: "textarea" });
  });
  expect(form).toBe(readFixture("form-with-inputs.html"));
});

test("form with attributes", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, {}, (f) => {
    f.input("name", { class: "user-input" });
    f.input("job");
  });
  expect(form).toBe(readFixture("form-with-attributes.html"));
});

test("form with default vals", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, {}, (f) => f.input("job", { as: "textarea" }));
  expect(form).toBe(readFixture("form-with-default-vals.html"));
});

test("form with custom vals", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { url: "#" }, (f) =>
    f.input("job", { as: "textarea", rows: 50, cols: 50 }),
  );
  expect(form).toBe(readFixture("form-with-custom-vals.html"));
});

test("Error field does not exist", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  expect(() =>
    HexletCode.formFor(template, { url: "/users" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.input("age");
    }),
  ).toThrow("Field 'age' does not exist in the template.");
});

test("form with default submit", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name");
    f.input("job", { as: "textarea" });
    f.submit();
  });
  expect(form).toBe(readFixture("form-with-default-submit.html"));
});

test("form with custom submit", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name");
    f.input("job", { as: "textarea" });
    f.submit("Wow");
  });
  expect(form).toBe(readFixture("form-with-custom-submit.html"));
});

test("label HTML", () => {
  const template = { name: "rob", job: "hexlet", gender: "m" };
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name", {
      label: "User",
      labelHtml: {
        class: "form-label",
        id: "name-label",
      },
    });
    f.submit("Ok");
  });
  expect(form).toBe(readFixture("label-HTML.html"));
});
