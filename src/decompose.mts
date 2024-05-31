import { decomposeHangul, isHangul } from "@/hangul.mjs";
import { getReducedUnicodeBlocks, getUnicodeBlock } from "@/unicode-blocks.mjs";

export type DetailDecomposed = {
  wordBeforeCharIndex: string;
  char: string;
  charIndex: number;
  decomposedSingle: string[];
};

export type FullDecomposed = {
  wordBeforeCharIndex: string;
  char: string;
  charIndex: number;
  decomposedSingle: string[];
  currentWord: string;
  flatIndex: number;
  decomposedIndex: number;
  decomposedAtIndex: string;
};

function simpleDecompose(input: string): string[] {
  return input.split("").flatMap((c) => {
    // if c is Hangul, decompose again with hangulSimpleDecompose function
    if (isHangul(c)) {
      return decomposeHangul(c);
    }

    // NFKD is a Unicode normalization form that decomposes characters;
    // NOT RECOMMENDED.
    return c.normalize("NFKD").split("");
  });
}

export function decompose(input: string, mode: "simple" | "detail" = "detail") {
  if (mode === "simple") {
    return simpleDecompose(input);
  }

  const result = input
    .split("")
    .map((char, charIndex, arr) => ({
      wordBeforeCharIndex: arr.slice(0, charIndex).join(""),
      char,
      charIndex,
      decomposedSingle: simpleDecompose(char),
    }))
    .flatMap((detail) =>
      detail.decomposedSingle.map(
        (v, i) =>
          ({
            ...detail,
            currentWord: input,
            flatIndex: 0,
            decomposedAtIndex: v,
            decomposedIndex: i,
          } satisfies FullDecomposed)
      )
    )
    .map((v, i) => ({
      ...v,
      flatIndex: i,
    }));

  return result;
}
