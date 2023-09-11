# presence

    brew cask install visual-studio-code

# init project

    npm i -g flow-typed

    npm init
    npm i -D eslint
    npm i -D eslint-plugin-import
    npm i -D eslint-plugin-flowtype
    npm i -D eslint-config-airbnb-base
    npm i -D eslint-config-prettier
    npm i -D pre-commit
    npm i -D lint-staged
    npm i -D babel-eslint
    npm i -D babel-preset-flow
    npm i -D flow-bin
    npm i -D source-map-support
    npm i -D husky

<!--
npm i babel-core
npm i babel-preset-env
npm i babel-cli
-->
# setup osx
```sh
sudo sqlite3 /Library/Application\ Support/com.apple.TCC/TCC.db 'PRAGMA table_info(access)'

sudo sqlite3 /Library/Application\ Support/com.apple.TCC/TCC.db 'select * from access'

sudo sqlite3 /Library/Application\ Support/com.apple.TCC/TCC.db 'select service, client, allowed from access WHERE service="kTCCServiceAccessibility" AND client LIKE "%SessionInspector"'

sudo sqlite3 /Library/Application\ Support/com.apple.TCC/TCC.db 'UPDATE access SET allowed=0 WHERE service="kTCCServiceAccessibility" AND client LIKE "%SessionInspector"'
```