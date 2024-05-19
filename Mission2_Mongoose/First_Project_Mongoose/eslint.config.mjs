import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef":"error",
      "no-console":"warn"
    },
    
ignores:[".dist/,**/node_modules/"]
    ,
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
