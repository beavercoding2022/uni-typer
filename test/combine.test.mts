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
