import { Tag } from "./Tag";
import { FormBuilder } from "./FormBuilder";

export function formFor(
  template: object,
  attr: { url?: string; method?: string },
  callback: (f: FormBuilder) => void,
): string {
  const formBuilder = new FormBuilder(template);
  callback(formBuilder);
  const tag = new Tag(
    "form",
    { action: attr.url ?? "#", method: attr.method ?? "post" },
    formBuilder.toString(),
  );

  return tag.toString();
}
