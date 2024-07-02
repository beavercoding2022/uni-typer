# API

## combine(input: string[]): string;

combine several characters into one character if possible

This supports Hangul/Korean only now (v1.0.1)

```javascript
test("combine 'ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ'", () => {
  expect(combine(["ㄱ", "ㅏ", "ㄴ", "ㅏ", "ㄷ", "ㅏ"])).toBe("가나다");
});

```

## decompose(input: string, mode: "detail"): FullDecomposed[];

decompose a character into its individual component objects

"detail" mode is set by default if not specified

This supports Hangul/Korean only now (v1.0.1)

```javascript
test("decompose '뷁뛣겍", () => {
  expect(decompose("뷁뛣겍")).toEqual([
    {
      wordBeforeCharIndex: "",
      char: "뷁",
      charIndex: 0,
      decomposedSingle: ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 0,
      decomposedAtIndex: "ㅂ",
      decomposedIndex: 0,
    },
    {
      wordBeforeCharIndex: "",
      char: "뷁",
      charIndex: 0,
      decomposedSingle: ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 1,
      decomposedAtIndex: "ㅜ",
      decomposedIndex: 1,
    },
    {
      wordBeforeCharIndex: "",
      char: "뷁",
      charIndex: 0,
      decomposedSingle: ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 2,
      decomposedAtIndex: "ㅔ",
      decomposedIndex: 2,
    },
    {
      wordBeforeCharIndex: "",
      char: "뷁",
      charIndex: 0,
      decomposedSingle: ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 3,
      decomposedAtIndex: "ㄹ",
      decomposedIndex: 3,
    },
    {
      wordBeforeCharIndex: "",
      char: "뷁",
      charIndex: 0,
      decomposedSingle: ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 4,
      decomposedAtIndex: "ㄱ",
      decomposedIndex: 4,
    },
    {
      wordBeforeCharIndex: "뷁",
      char: "뛣",
      charIndex: 1,
      decomposedSingle: ["ㄸ", "ㅜ", "ㅔ", "ㄹ", "ㅎ"],
      currentWord: "뷁뛣겍",
      flatIndex: 5,
      decomposedAtIndex: "ㄸ",
      decomposedIndex: 0,
    },
    {
      wordBeforeCharIndex: "뷁",
      char: "뛣",
      charIndex: 1,
      decomposedSingle: ["ㄸ", "ㅜ", "ㅔ", "ㄹ", "ㅎ"],
      currentWord: "뷁뛣겍",
      flatIndex: 6,
      decomposedAtIndex: "ㅜ",
      decomposedIndex: 1,
    },
    {
      wordBeforeCharIndex: "뷁",
      char: "뛣",
      charIndex: 1,
      decomposedSingle: ["ㄸ", "ㅜ", "ㅔ", "ㄹ", "ㅎ"],
      currentWord: "뷁뛣겍",
      flatIndex: 7,
      decomposedAtIndex: "ㅔ",
      decomposedIndex: 2,
    },
    {
      wordBeforeCharIndex: "뷁",
      char: "뛣",
      charIndex: 1,
      decomposedSingle: ["ㄸ", "ㅜ", "ㅔ", "ㄹ", "ㅎ"],
      currentWord: "뷁뛣겍",
      flatIndex: 8,
      decomposedAtIndex: "ㄹ",
      decomposedIndex: 3,
    },
    {
      wordBeforeCharIndex: "뷁",
      char: "뛣",
      charIndex: 1,
      decomposedSingle: ["ㄸ", "ㅜ", "ㅔ", "ㄹ", "ㅎ"],
      currentWord: "뷁뛣겍",
      flatIndex: 9,
      decomposedAtIndex: "ㅎ",
      decomposedIndex: 4,
    },
    {
      wordBeforeCharIndex: "뷁뛣",
      char: "겍",
      charIndex: 2,
      decomposedSingle: ["ㄱ", "ㅔ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 10,
      decomposedAtIndex: "ㄱ",
      decomposedIndex: 0,
    },
    {
      wordBeforeCharIndex: "뷁뛣",
      char: "겍",
      charIndex: 2,
      decomposedSingle: ["ㄱ", "ㅔ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 11,
      decomposedAtIndex: "ㅔ",
      decomposedIndex: 1,
    },
    {
      wordBeforeCharIndex: "뷁뛣",
      char: "겍",
      charIndex: 2,
      decomposedSingle: ["ㄱ", "ㅔ", "ㄱ"],
      currentWord: "뷁뛣겍",
      flatIndex: 12,
      decomposedAtIndex: "ㄱ",
      decomposedIndex: 2,
    },
  ]);
});
```


## decompose(input: string, mode: "simple"): string[];

decompose a character into its individual components

"simple" mode is set when you specify it

```javascript
test("decompose '가나다'", () => {
  expect(decompose("가나다", "simple")).toEqual([
    "ㄱ",
    "ㅏ",
    "ㄴ",
    "ㅏ",
    "ㄷ",
    "ㅏ",
  ]);
});
```


## chosungIncludes(target: string, chosung: string): boolean;

inspired by es-hangul, TOSS

```javascript
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
```

## josa(word: string, josa: Josa): string;

inspired by es-hangul, TOSS


```javascript

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

```