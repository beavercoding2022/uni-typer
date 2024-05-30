import { getUnicodeBlock } from "@/unicode-blocks.mjs";
import { expect, test } from "vitest";

test("is 가 a Hangul Syllable?", () => {
  expect(getUnicodeBlock("가")).toEqual([
    {
      char: "가",
      block: "Hangul Syllables",
    },
  ]);
});

test("is 'abcd가' getting blocks?", () => {
  expect(getUnicodeBlock("abcd가")).toEqual([
    {
      char: "a",
      block: "Basic Latin",
    },
    {
      char: "b",
      block: "Basic Latin",
    },
    {
      char: "c",
      block: "Basic Latin",
    },
    {
      char: "d",
      block: "Basic Latin",
    },
    {
      char: "가",
      block: "Hangul Syllables",
    },
  ]);
});
