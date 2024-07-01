import { combine } from "../src/combine.mjs";
import { expect, test } from "vitest";

test("combine 'ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ'", () => {
  expect(combine(["ㄱ", "ㅏ", "ㄴ", "ㅏ", "ㄷ", "ㅏ"])).toBe("가나다");
});

test("combine 'ㅂ', 'ㅜ', 'ㅔ', 'ㄹ', 'ㄱ', 'ㅅ', 'ㅡ'", () => {
  expect(combine(["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ", "ㅅ", "ㅡ"])).toBe("뷁스");
});

test("combine 'ㅂ', 'ㅜ', 'ㅔ', 'ㄹ', 'ㄱ'", () => {
  expect(combine(["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"])).toBe("뷁");
});

test('combine "ㅎ", "ㅏ", "ㄴ", "ㄱ", "ㅡ", "ㄹ", "ㅁ", "ㅜ", "ㄴ", "ㅈ", "ㅏ", "ㅇ"', () => {
  expect(
    combine([
      "ㅎ",
      "ㅏ",
      "ㄴ",
      "ㄱ",
      "ㅡ",
      "ㄹ",
      "ㅁ",
      "ㅜ",
      "ㄴ",
      "ㅈ",
      "ㅏ",
      "ㅇ",
    ])
  ).toBe("한글문장");
});

test('combine "ㄷ", "ㅏ", "ㄹ", "ㄱ", "ㅏ", "ㄴ", "ㅗ", "ㄴ", "ㅣ"', () => {
  expect(combine(["ㄷ", "ㅏ", "ㄹ", "ㄱ", "ㅏ", "ㄴ", "ㅗ", "ㄴ", "ㅣ"])).toBe(
    "달가노니"
  );
});
