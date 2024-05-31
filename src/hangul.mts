// Inspired by https://github.com/e-/Hangul.js

import {
  getReducedUnicodeBlocks,
  getUnicodeBlock,
  isInBlock,
} from "@/unicode-blocks.mjs";

const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
/* Disassembled 중성(nucleus) */
const JUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  ["ㅘ", "ㅗ", "ㅏ"],
  ["ㅙ", "ㅗ", "ㅐ"],
  ["ㅚ", "ㅗ", "ㅣ"],
  "ㅛ",
  "ㅜ",
  ["ㅝ", "ㅜ", "ㅓ"],
  ["ㅞ", "ㅜ", "ㅔ"],
  ["ㅟ", "ㅜ", "ㅣ"],
  "ㅠ",
  "ㅡ",
  ["ㅢ", "ㅡ", "ㅣ"],
  "ㅣ",
];
/* Desassembled 종성(coda) */
const JONG = [
  "",
  "ㄱ",
  "ㄲ",
  ["ㄳ", "ㄱ", "ㅅ"],
  "ㄴ",
  ["ㄵ", "ㄴ", "ㅈ"],
  ["ㄶ", "ㄴ", "ㅎ"],
  "ㄷ",
  "ㄹ",
  ["ㄺ", "ㄹ", "ㄱ"],
  ["ㄻ", "ㄹ", "ㅁ"],
  ["ㄼ", "ㄹ", "ㅂ"],
  ["ㄽ", "ㄹ", "ㅅ"],
  ["ㄾ", "ㄹ", "ㅌ"],
  ["ㄿ", "ㄹ", "ㅍ"],
  ["ㅀ", "ㄹ", "ㅎ"],
  "ㅁ",
  "ㅂ",
  ["ㅄ", "ㅂ", "ㅅ"],
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
/* 유니코드 한글 (Hangul Syllables) 시작 위치 */
const HANGUL_OFFSET = 0xac00;
/* 자음 */
const CONSONANTS = [
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
/* Assembled 초성 */
const COMPLETE_CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
/* Assembled 중성 */
const COMPLETE_JUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
/* Assembled 종성 */
const COMPLETE_JONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
/* 복잡한 자음: [ 자음1+자음2, 자음1, 자음2  ] */
/* 복잡한 모음: [모음1+모음2, 모음1, 모음2] */
const COMPLEX_CONSONANTS = [
  ["ㄳ", "ㄱ", "ㅅ"],
  ["ㄵ", "ㄴ", "ㅈ"],
  ["ㄶ", "ㄴ", "ㅎ"],
  ["ㄺ", "ㄹ", "ㄱ"],
  ["ㄻ", "ㄹ", "ㅁ"],
  ["ㄼ", "ㄹ", "ㅂ"],
  ["ㄽ", "ㄹ", "ㅅ"],
  ["ㄾ", "ㄹ", "ㅌ"],
  ["ㄿ", "ㄹ", "ㅍ"],
  ["ㅀ", "ㄹ", "ㅎ"],
  ["ㅄ", "ㅂ", "ㅅ"],
];
const COMPLEX_VOWELS = [
  ["ㅘ", "ㅗ", "ㅏ"],
  ["ㅙ", "ㅗ", "ㅐ"],
  ["ㅚ", "ㅗ", "ㅣ"],
  ["ㅝ", "ㅜ", "ㅓ"],
  ["ㅞ", "ㅜ", "ㅔ"],
  ["ㅟ", "ㅜ", "ㅣ"],
  ["ㅢ", "ㅡ", "ㅣ"],
];

const COMPLEXES = [...COMPLEX_CONSONANTS, ...COMPLEX_VOWELS];

function getFromTable(table: (string | string[])[], index: number) {
  const selected = table[index];

  if (Array.isArray(selected)) {
    return selected[0];
  }

  return selected;
}

export function isHangul(input: string) {
  return getUnicodeBlock(input, getReducedUnicodeBlocks("Hangul")).every(
    (v) => v.block !== "Unknown"
  );
}

export function decomposeHangul(singleChar: string): string[] {
  if (singleChar.length !== 1) {
    throw new Error("Input must be a single character.");
  }

  const unicode = singleChar.charCodeAt(0);

  // 완성형 한글 11172자 = 19 × 21 × (27 +1) = 11172
  // 참고: https://namu.wiki/w/%ED%98%84%EB%8C%80%20%ED%95%9C%EA%B8%80%EC%9D%98%20%EB%AA%A8%EB%93%A0%20%EA%B8%80%EC%9E%90
  if (isInBlock("Hangul Syllables")(singleChar)) {
    const code = unicode - HANGUL_OFFSET;
    const jong = code % 28;
    const jung = Math.floor((code - jong) / 28) % 21;
    const cho = Math.floor((code - jong) / 28 / 21);

    return [CHO[cho], getFromTable(JUNG, jung), getFromTable(JONG, jong)]
      .filter((v) => v !== "" && typeof v === "string")
      .flatMap((v) => decomposeHangul(v));
  }

  if (
    isInBlock([
      "Hangul Jamo",
      "Hangul Compatibility Jamo",
      "Hangul Jamo Extended-A",
      "Hangul Jamo Extended-B",
    ])(singleChar)
  ) {
    const complex = COMPLEXES.find((v) => v[0] === singleChar);

    return complex ? [...complex.slice(1)] : [singleChar];
  }

  return [singleChar];
}

export function combineHangul(arrStr: string[]) {
  arrStr.reduce((acc, str) => {
    return acc;
  }, [] as string[]);
}
