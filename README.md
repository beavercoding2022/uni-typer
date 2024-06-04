# Uni typer

Uni typer is a tool for splitting unicode characters into their individual components. 

It is useful for debugging and understanding how unicode characters are composed.

## Current status

2024.06.04: Decomposition and Composition of Hangul characters are supported. 


##  Installation

```
npm add @beavercoding/uni-typer
```

```
yarn add @beavercoding/uni-typer
```

```
pnpm add @beavercoding/uni-typer
```

### Module System
CJS and ESM are supported.


## Usage

```javascript
import { decompose } from '@beavercoding/uni-typer';
// const { decompose } = require('@beavercoding/uni-typer');

const simple = decompose('가나다', 'simple');

// ["ㄱ","ㅏ","ㄴ","ㅏ","ㄷ","ㅏ"]

const detailed = decompose('가나다');

// [
//   {
//     wordBeforeCharIndex: '',
//     char: '가',
//     charIndex: 0,
//     decomposedSingle: [ 'ㄱ', 'ㅏ' ],
//     currentWord: '가나다',
//     flatIndex: 0,
//     decomposedAtIndex: 'ㄱ',
//     decomposedIndex: 0
//   },
//   {
//     wordBeforeCharIndex: '',
//     char: '가',
//     charIndex: 0,
//     decomposedSingle: [ 'ㄱ', 'ㅏ' ],
//     currentWord: '가나다',
//     flatIndex: 1,
//     decomposedAtIndex: 'ㅏ',
//     decomposedIndex: 1
//   },
//   {
//     wordBeforeCharIndex: '가',
//     char: '나',
//     charIndex: 1,
//     decomposedSingle: [ 'ㄴ', 'ㅏ' ],
//     currentWord: '가나다',
//     flatIndex: 2,
//     decomposedAtIndex: 'ㄴ',
//     decomposedIndex: 0
//   },
//   {
//     wordBeforeCharIndex: '가',
//     char: '나',
//     charIndex: 1,
//     decomposedSingle: [ 'ㄴ', 'ㅏ' ],
//     currentWord: '가나다',
//     flatIndex: 3,
//     decomposedAtIndex: 'ㅏ',
//     decomposedIndex: 1
//   },
//   {
//     wordBeforeCharIndex: '가나',
//     char: '다',
//     charIndex: 2,
//     decomposedSingle: [ 'ㄷ', 'ㅏ' ],
//     currentWord: '가나다',
//     flatIndex: 4,
//     decomposedAtIndex: 'ㄷ',
//     decomposedIndex: 0
//   },
//   {
//     wordBeforeCharIndex: '가나',
//     char: '다',
//     charIndex: 2,
//     decomposedSingle: [ 'ㄷ', 'ㅏ' ],
//     currentWord: '가나다',
//     flatIndex: 5,
//     decomposedAtIndex: 'ㅏ',
//     decomposedIndex: 1
//   }
// ]
```

```javascript
import { combine } from '@beavercoding/uni-typer';

combine([
    "ㄱ",
    "ㅏ",
    "ㄴ",
    "ㅏ",
    "ㄷ",
    "ㅏ",
  ])
// 가나다

combine([
  "ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ", "ㅅ", "ㅡ"
])
// 뷁스
```

## Contribution

Please feel free to contribute to this project. 

## Contact
on this repository,
Email: pcj9024@gmail.com ,
Discord: https://discord.gg/jj2cfVsX ,
KakaoTalk: https://open.kakao.com/me/beavercoding2022 ,