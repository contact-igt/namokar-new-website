import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Read-only reference copy of the older Pages Router project (extracted ZIP): not part of this app.
    "namokareyecare-website-frontend-main/**",
    "pixel-eye-2-main/**",
  ]),
]);

export default eslintConfig;
