// Inspired by https://github.com/e-/Hangul.js

import { decompose } from "@/decompose.mjs";
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
const COMPLEX_VOWELS: [string, string, string][] = [
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

export function removeJungAndJong(input: string) {
  if (input.length !== 1) {
    throw new Error("Input must be a single character.");
  }

  const unicode = input.charCodeAt(0);

  if (isInBlock("Hangul Syllables")(input)) {
    const code = unicode - HANGUL_OFFSET;
    const jong = code % 28;
    const jung = Math.floor((code - jong) / 28) % 21;

    return String.fromCharCode(unicode - jong - jung * 28);
  }

  return input;
}

export function removeJong(input: string) {
  if (typeof input !== "string") {
    throw new Error("Input must be a string.");
  }

  if (input.length !== 1) {
    throw new Error("Input must be a single character.");
  }

  const unicode = input.charCodeAt(0);

  if (isInBlock("Hangul Syllables")(input)) {
    const code = unicode - HANGUL_OFFSET;
    const jong = code % 28;

    return String.fromCharCode(unicode - jong);
  }

  return input;
}

export function excerptJung(input: string): string {
  const sanitized =
    typeof input !== "string" ? "" : input.length > 1 ? input[0] : input;

  const unicode = sanitized.charCodeAt(0);

  if (isInBlock("Hangul Syllables")(sanitized)) {
    const code = unicode - HANGUL_OFFSET;
    const jung = Math.floor((code - (code % 28)) / 28) % 21;

    return typeof JUNG[jung] === "string"
      ? (JUNG[jung] as string)
      : JUNG[jung][0];
  }

  return "";
}

export function excerptJong(input: string): string {
  const sanitized =
    typeof input !== "string" ? "" : input.length > 1 ? input[0] : input;

  const unicode = sanitized.charCodeAt(0);

  if (isInBlock("Hangul Syllables")(sanitized)) {
    const code = unicode - HANGUL_OFFSET;
    const jong = code % 28;

    return typeof JONG[jong] === "string"
      ? (JONG[jong] as string)
      : JONG[jong][0];
  }

  return "";
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

export function combineHangul(input: string[]) {
  return input
    .reduce(
      (acc, cur, index) => {
        // if the cur is not hangul, add and skip
        if (!isHangul(cur)) {
          return {
            ...acc,
            result: [...acc.result, cur],
            last: cur,
            index,
          };
        }

        const typed = acc.result[acc.result.length - 1];
        if (typeof typed !== "string") {
          return {
            ...acc,
            result: [...acc.result, cur],
            last: cur,
            index,
          };
        }

        // (자음 + 단/복모음 + 단자음) + 단자음 => 한글자
        if (
          isInBlock("Hangul Syllables")(typed) &&
          JONG.findIndex((v) => v[1] === excerptJong(typed) && v[2] === cur) >
            -1
        ) {
          const code = removeJong(typed).charCodeAt(0);

          const complexIndex = JONG.findIndex(
            (v) =>
              typeof v !== "string" &&
              v[1] === excerptJong(typed) &&
              v[2] === cur
          );

          const result = String.fromCharCode(code + complexIndex);

          return {
            ...acc,
            result: [...acc.result.slice(0, acc.result.length - 1), result],
            last: cur,
            index,
          };
        }

        // (자음 + 모음 + 단자음) + 모음 => 두글자
        if (
          isInBlock("Hangul Syllables")(typed) &&
          (typed.charCodeAt(0) - HANGUL_OFFSET) % 28 !== 0 &&
          JONG.findIndex(
            (v) => typeof v !== "string" && v[0] === excerptJong(typed)
          ) === -1 &&
          JUNG.includes(cur)
        ) {
          const jongRemoved = removeJong(typed);
          const jong = excerptJong(typed);

          const choIndex = CHO.indexOf(jong);
          const jungIndex = JUNG.indexOf(cur);

          const result = String.fromCharCode(
            HANGUL_OFFSET + choIndex * 21 * 28 + jungIndex * 28
          );

          return {
            ...acc,
            result: [
              ...acc.result.slice(0, acc.result.length - 1),
              jongRemoved,
              result,
            ],
            last: cur,
            index,
          };
        }

        // (자음 + 모음) + 모음 => (자음 + 복모음)
        const maybeComplexVowelIndex = JUNG.findIndex(
          (v) =>
            typeof v !== "string" && v[1] === excerptJung(typed) && v[2] === cur
        );

        if (
          isInBlock("Hangul Syllables")(typed) &&
          (typed.charCodeAt(0) - HANGUL_OFFSET) % 28 === 0 &&
          maybeComplexVowelIndex > -1
        ) {
          const choCode =
            Math.floor((typed.charCodeAt(0) - HANGUL_OFFSET) / (28 * 21)) *
              (28 * 21) +
            HANGUL_OFFSET; // 자음 + ㅏ 위치 찾기

          const result = String.fromCharCode(
            choCode + maybeComplexVowelIndex * 28
          );

          return {
            ...acc,
            result: [...acc.result.slice(0, acc.result.length - 1), result],
            last: cur,
            index,
          };
        }

        // (자음 + 단/복모음) + 자음 => 한글자
        if (
          isInBlock("Hangul Syllables")(typed) &&
          (typed.charCodeAt(0) - HANGUL_OFFSET) % 28 === 0 && // (초성 + 중성)
          JONG.includes(cur)
        ) {
          const result = String.fromCharCode(
            typed.charCodeAt(0) + JONG.indexOf(cur)
          );

          return {
            ...acc,
            result: [...acc.result.slice(0, acc.result.length - 1), result],
            last: cur,
            index,
          };
        }

        // 자음 + 단모음
        if (CHO.includes(typed) && JUNG.includes(cur)) {
          const choIndex = CHO.indexOf(typed);
          const jungIndex = JUNG.indexOf(cur);

          const result = String.fromCharCode(
            HANGUL_OFFSET + choIndex * 21 * 28 + jungIndex * 28
          );

          return {
            ...acc,
            result: [...acc.result.slice(0, acc.result.length - 1), result],
            last: cur,
            index,
          };
        }

        return {
          ...acc,
          result: [...acc.result, cur],
          last: cur,
          index,
        };
      },
      {
        input,
        result: [] as string[],
        last: "",
        index: -1,
      }
    )
    .result.join("");
}

// Inspired by es-hangul, TOSS
export function chosungIncludes(target: string, chosung: string) {
  if (chosung.length > target.length) {
    return false;
  }

  const targetOnlyHangul = target
    .split("")
    .filter((c) => isHangul(c))
    .join("");
  const chosungOnlyHangul = chosung
    .split("")
    .filter((c) => isHangul(c))
    .join("");

  const chosungDecomposed = decompose(chosungOnlyHangul, "detail");

  if (chosungDecomposed.length !== chosung.length) {
    return false;
  }

  const chosungArr = chosungDecomposed.reduce((acc, cur) => {
    if (cur.decomposedIndex === 0) {
      return [...acc, cur.decomposedAtIndex];
    }

    return acc;
  }, [] as string[]);

  const result = decompose(targetOnlyHangul, "detail").reduce(
    (acc, _cur, index, arr) => {
      if (acc) {
        return true;
      }

      if (index + chosungArr.length > arr.length) {
        return false;
      }

      const ahead = arr
        .filter((v) => v.decomposedIndex === 0)
        .slice(index, index + chosungArr.length)
        .map((v) => v);

      if (ahead.length === 0) {
        return false;
      }

      if (
        ahead.length > 0 &&
        ahead.every((v, i) => v.decomposedAtIndex === chosungArr[i])
      ) {
        return true;
      }

      return acc;
    },
    false
  );

  return result;
}

// Inspired by es-hangul, TOSS
export type Josa =
  | "이/가"
  | "을/를"
  | "은/는"
  | "으로/로"
  | "와/과"
  | "이나/나"
  | "이에/에"
  | "이란/란"
  | "아/야"
  | "이랑/랑"
  | "이에요/예요"
  | "으로서/로서"
  | "으로써/로써"
  | "으로부터/로부터";

export function josa(word: string, josa: Josa) {
  const lastChar = word[word.length - 1];
  const lastCharDecomposed = decompose(lastChar, "detail");

  if (lastCharDecomposed.length === 0) {
    return word;
  }

  const lastCharJong = lastCharDecomposed[lastCharDecomposed.length - 1];

  if (CHO.includes(lastCharJong.decomposedAtIndex)) {
    return word + josa.split("/")[0];
  }

  return word + josa.split("/")[1];
}
