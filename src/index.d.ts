import { FullDecomposed } from "@/decompose.mjs";
import { Josa } from "@/hangul.mjs";

declare module "@beavercoding/uni-typer" {
  export function decompose(input: string): string[];
  export function decompose(input: string, mode: "simple"): string[];
  export function decompose(input: string, mode: "detail"): FullDecomposed[];
  export function combine(input: string[]): string;
  // inspired by es-hangul, TOSS
  export function chosungIncludes(target: string, chosung: string): boolean;
  // inspired by es-hangul, TOSS
  export function josa(word: string, josa: Josa): string;
}
