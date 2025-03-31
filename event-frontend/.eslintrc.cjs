module.exports = {
  env: {
    node  : true,
    es2022: true,
  },
  extends: [
    require.resolve("@yarnpkg/eslint-config"),
    require.resolve("@yarnpkg/eslint-config/react"),
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "lib"],
  parser        : "@typescript-eslint/parser",
  plugins       : ["sort-destructure-keys",
    "unicorn",
    "filenames-simple",
    "@stylistic",
    "@stylistic/ts",
  ],
  rules: {
    "no-console":"error",
    "@stylistic/indent"                : ["error", 2],
    "@stylistic/function-paren-newline": ["error", "never"],
    "@stylistic/no-multi-spaces"       : "off",
    "@stylistic/key-spacing"           : ["error", {
      align: {
        beforeColon: false,
        afterColon : true,
        on         : "colon",
      },
    }],
    "@stylistic/padding-line-between-statements": ["error",
      {
        blankLine: "always",
        prev     : "*",
        next     : "return",
      },
    ],
    "@stylistic/space-before-function-paren": ["error", {
      anonymous : "always",
      named     : "never",
      asyncArrow: "always",
    }],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-require-imports"         : ["error"],
    "@typescript-eslint/naming-convention"          : ["error",
      {
        selector: [
          "classProperty",
          "objectLiteralProperty",
          "typeProperty",
          "classMethod",
          "objectLiteralMethod",
          "typeMethod",
          "accessor",
          "enumMember",
        ],
        format   : null,
        modifiers: ["requiresQuotes"],
      },
      {
        selector: "variable",
        format  : ["camelCase", "UPPER_CASE", "PascalCase"],
      },
      {
        selector : "variable",
        modifiers: ["destructured"],
        format   : null,
      },
      {
        selector         : "memberLike",
        modifiers        : ["private"],
        format           : ["camelCase"],
      },

      {
        selector: "typeLike",
        format  : ["PascalCase"],
      },
      // {
      //   selector: "typeParameter",
      //   format  : ["PascalCase"],
      //   prefix  : ["T"],
      // },
      {
        selector: "interface",
        format  : ["PascalCase"],
        custom  : {
          regex: "^I[A-Z]",
          match: false,
        },
      },
    ],
    "@stylistic/quotes"        : ["error", "double", { allowTemplateLiterals: true }],
    "arca/curly"               : 0,
    "arca/import-quotes"       : 0,
    "arca/jsx-longhand-props"  : 0,
    "arca/no-default-export"   : 2,
    "filenames-simple/no-index": 2,
    "id-length"                : ["error", {
      min       : 1,
      max       : 30,
      exceptions: ["_", "e", "i", "j", "k", "x", "y", "z"],
      properties: "never",
    }],
    "func-style"                                 : ["error", "declaration", { allowArrowFunctions: true }],
    "no-multiple-empty-lines"                    : ["error", { max: 1, maxEOF: 1 }],
    "object-curly-spacing"                       : ["error", "always"],
    "prefer-destructuring"                       : ["error", { AssignmentExpression: { array: false, object: false } }],
    "sort-destructure-keys/sort-destructure-keys": 2,
    "object-curly-newline"                       : ["error", {
      ObjectExpression : { multiline: true, minProperties: 3 },
      ObjectPattern    : "never",
      ImportDeclaration: "never",
      ExportDeclaration: { multiline: true, minProperties: 3 },
    }],
    "object-property-newline"          : ["error", { allowAllPropertiesOnSameLine: true }],
    "newline-per-chained-call"         : ["error"],
    "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
    "react/jsx-indent"                 : ["error", 2],
    "react/jsx-wrap-multilines"        : ["error", {
      declaration: "parens",
      assignment : "parens",
      return     : "parens-new-line",
      arrow      : "parens",
      condition  : "ignore",
      logical    : "ignore",
      prop       : "ignore",
    }],
    "unicorn/consistent-destructuring"          : 2,
    "@typescript-eslint/quotes"                 : "off",
    "@typescript-eslint/type-annotation-spacing": "off",
    "@typescript-eslint/indent"                 : "off",
    "key-spacing"                               : "off",
  },
  overrides: [
    {
      files: ["*.tsx", "*.config.ts"],
      rules: { "arca/no-default-export": 0 },
    },
    {
      files: ["app/*", "src/*", "packages/**/src/*"],
      rules: { "filenames-simple/no-index": 0 },
    },
  ],
};
