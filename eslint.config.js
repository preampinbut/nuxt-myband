import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";

import prettier from "eslint-plugin-prettier/recommended";

export default [
  prettier,

  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),

  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          singleAttributePerLine: true,
        },
      ],
      "vue/multi-word-component-names": "off", // required for nuxt
      curly: "error",
      camelcase: "error",
      eqeqeq: "error",
      "no-undef": "off",
      "no-unused-vars": "warn",
      "no-useless-escape": "off",
      "object-curly-newline": [
        "error",
        {
          ObjectExpression: "always",
          ObjectPattern: {
            multiline: true,
          },
        },
      ],
    },
  },
];
