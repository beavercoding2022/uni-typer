import swc from "@rollup/plugin-swc";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import alias from "@rollup/plugin-alias";

export default [
  {
    input: "./src/index.mts",
    output: [
      {
        file: "./dist/index.mjs",
        format: "es",
        sourcemap: true,
      },
      {
        file: "./dist/index.cjs",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      swc(),
      typescript({
        declaration: true,
        exclude: ["**/__tests__", "**/*.test.ts", "test/**/*.*"],
      }),
    ],
  },
  {
    input: "./src/index.d.ts",
    output: [{ file: "dist/index.d.mts", format: "es" }],
    plugins: [
      alias({
        entries: [{ find: "@", replacement: "./" }],
      }),
      dts(),
    ],
  },
];
