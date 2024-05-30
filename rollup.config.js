import swc from "@rollup/plugin-swc";
import typescript from "@rollup/plugin-typescript";

export default {
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
  plugins: [swc(), typescript()],
};
