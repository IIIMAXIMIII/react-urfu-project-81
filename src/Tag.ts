export class Tag {
  private attributes: [string, string][];
  private static singleTags: Set<string> = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "source",
    "track",
    "wbr",
  ]);
  constructor(
    private tagName: string,
    obj: Record<string, unknown> = {},
    private text: string = "",
  ) {
    if (text !== "" && Tag.singleTags.has(tagName)) {
      throw new Error("It is impossible to use text within a single tag.");
    }
    this.attributes = Object.entries(obj).map(([k, v], _i, _arr) => [k, String(v)]);
  }

  toString(): string {
    const attrStr = this.attributes.map(([k, v], _i, _arr) => ` ${k}="${v}"`);
    const openTag = `<${this.tagName}${attrStr.join("")}>`;
    const closeTag = Tag.singleTags.has(this.tagName) ? "" : `</${this.tagName}>`;
    const tag = `${openTag}${this.text}${closeTag}`;
    return tag;
  }
}
