import {
  chosungIncludes,
  excerptJong,
  excerptJung,
  josa,
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

// inspired by es-hangul, TOSS
test('chosungIncludes: "프론트엔드" includes "ㅍㄹㅌ"', () => {
  expect(chosungIncludes("프론트엔드", "ㅍㄹㅌ")).toBe(true);
});

test('chosungIncludes: "00프론트엔드" includes "ㅍㄹㅌ"', () => {
  expect(chosungIncludes("00프론트엔드", "ㅍㄹㅌ")).toBe(true);
});

test('chosungIncludes: "프론트엔드" does not include "ㅍㅌ"', () => {
  expect(chosungIncludes("00프론트엔드", "ㅍㅌ")).toBe(false);
});

test('chosungIncludes: "프론트엔드" does not include "푸롴트"', () => {
  expect(chosungIncludes("00프론트엔드", "푸롴트")).toBe(false);
});

test('josa: "샴푸" -> "샴푸가"', () => {
  expect(josa("샴푸", "이/가")).toBe("샴푸가");
});

test('josa: "칫솔" -> "칫솔이"', () => {
  expect(josa("칫솔", "이/가")).toBe("칫솔이");
});

test('josa: "바깥" -> "바깥으로"', () => {
  expect(josa("바깥", "으로/로")).toBe("바깥으로");
});

test('josa: "내부" -> "내부로"', () => {
  expect(josa("내부", "으로/로")).toBe("내부로");
});
