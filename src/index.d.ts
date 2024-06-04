import { FullDecomposed } from "@/decompose.mjs";

declare module "@beavercoding/uni-typer" {
  export function decompose(input: string): string[];
  export function decompose(input: string, mode: "simple"): string[];
  export function decompose(input: string, mode: "detail"): FullDecomposed[];
  export function combine(input: string[]): string;
}
