import { test, expect } from "vitest";
import { Tag } from "../src/Tag";

test("single tag without attributes", () => {
  expect(new Tag("br").toString()).toBe("<br>");
});

test("single tag with attribute", () => {
  expect(new Tag("img", { src: "path/to/image" }).toString()).toBe('<img src="path/to/image">');
});

test("single tag with attributes", () => {
  expect(new Tag("input", { type: "submit", value: "Save" }).toString()).toBe(
    '<input type="submit" value="Save">',
  );
});

test("single tag with text throws error", () => {
  expect(() => new Tag("br", {}, "text")).toThrow(
    "It is impossible to use text within a single tag.",
  );
});

test("pair tag without attributes and text", () => {
  expect(new Tag("div").toString()).toBe("<div></div>");
});

test("pair tag with attributes and text", () => {
  expect(new Tag("label", { for: "email" }, "Email").toString()).toBe(
    '<label for="email">Email</label>',
  );
});

test("pair tag without attributes with text", () => {
  expect(new Tag("label", {}, "Email").toString()).toBe("<label>Email</label>");
});

test("pair tag with attributes without text", () => {
  expect(new Tag("label", { for: "email" }).toString()).toBe('<label for="email"></label>');
});
