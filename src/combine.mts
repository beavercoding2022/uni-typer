import { combineHangul } from "@/hangul.mjs";
import { isInBlock } from "@/unicode-blocks.mjs";

export function combine(input: string[]) {
  if (input.some((char) => isInBlock("Hangul")(char))) {
    return combineHangul(input);
  }

  return input;
}
