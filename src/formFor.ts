import { Tag } from "./Tag";
import { FormBuilder } from "./FormBuilder";

export function formFor(
  template: object,
  attr: { url?: string },
  _callback: (f: FormBuilder) => void,
): string {
  const tag = new Tag("form", { action: attr.url ?? "#", method: "post" });

  return tag.toString();
}
