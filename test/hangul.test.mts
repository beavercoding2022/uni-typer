import {
  excerptJong,
  excerptJung,
  removeJong,
  removeJungAndJong,
} from "../src/hangul.mjs";
import { expect, test } from "vitest";
test("'바' 에서 중성만 가져오면 'ㅏ'", () => {
  expect(excerptJung("바")).toBe("ㅏ");
});

test("'붸' 에서 중성만 가져오면 'ㅞ'", () => {
  expect(excerptJung("바")).toBe("ㅏ");
});

test("'종'에서 종성 제거하면 '조'", () => {
  expect(removeJong("종")).toBe("조");
});

test("'종'에서 중성 종성 제거하면 '자'", () => {
  expect(removeJungAndJong("종")).toBe("자");
});

test("'종'에서 종성만 가져오면 'ㅇ'", () => {
  expect(excerptJong("종")).toBe("ㅇ");
});

test("'뷁'에서 종성만 가져오면 'ㄺ'", () => {
  expect(excerptJong("뷁")).toBe("ㄺ");
});
