# presence

    brew cask install visual-studio-code

# init project

    npm i -g yarn
    yarn init
    yarn add -D eslint
    yarn add -D eslint-config-airbnb-base
    yarn add -D eslint-plugin-import
    yarn add -D eslint-config-prettier
    yarn add -D pre-commit
    yarn add -D lint-staged

# package.json

```
  "eslintConfig": {
    "root": true,
    "extends": [
      "airbnb-base",
      "prettier"
    ]
  },
  "pre-commit": "lint-staged",
  "lint-staged": {
    "*.js": "eslint"
  }
```

<!--
yarn add babel-core
yarn add babel-preset-env
yarn add babel-cli
-->
