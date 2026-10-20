import { Tag } from "./Tag";

type InputOptions = {
  as?: "input" | "textarea";
  cols?: number;
  rows?: number;
  [key: string]: unknown;
};

export class FormBuilder {
  private tags: Tag[] = [];
  private template: Map<string, string>;

  constructor(template: object) {
    this.template = new Map(Object.entries(template).map(([k, v]) => [k, String(v)]));
  }

  public input(name: string, mod?: InputOptions): void {
    const val = this.template.get(name);
    if (val === undefined) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }
    const { as, cols, rows, ...rest } = mod ?? {};
    const isTextarea = as === "textarea";
    const tagName = isTextarea ? "textarea" : "input";

    if (isTextarea) {
      const attrs: Record<string, unknown> = {
        cols: cols ?? "20",
        rows: rows ?? "40",
        name: name,
        ...rest,
      };

      const tag = new Tag(tagName, attrs, val);
      this.tags.push(tag);
    } else {
      const attrs: Record<string, unknown> = {
        name: name,
        type: "text",
        value: val,
        ...rest,
      };

      const tag = new Tag(tagName, attrs);
      this.tags.push(tag);
    }
  }

  public toString() {
    return this.tags.map((v) => v.toString()).join("");
  }
}
