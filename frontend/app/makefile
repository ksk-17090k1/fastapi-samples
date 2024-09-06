# --- Node.js ---

package.json:
	npm init

# --- Setup TypeScript ---
# first
up-ts: package.json 
	npm install -D typescript @types/node
	make tsconfig.json

tsconfig.json: 
	npx tsc --init
	@echo "❗tsconfig.jsonの設定を行ってください❗"
	@echo "以下をtrueにすることをオススメします。"
	@echo "noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitReturns"
	@echo "noFallthroughCasesInSwitch, noImplicitOverride"

clean-ts:
	rm -rf node_modules package-lock.json  package.json tsconfig.json

# --- Eslint ---
# 質問への回答はこれを参照のこと：
# https://dev.to/devdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amf
# NOTE: React使うなら Where does your code run? は Browser を選ぶ
# first
up_eslint: package.json 
	npm init @eslint/config@latest
# eslint-plugin-react-hooks がeslintの9系に対応していないため、8系をインストール
	npm install eslint@8.56.0
	make up-eslint-react

up_eslint_react:
	npm i -D eslint-plugin-react 
	npm i -D eslint-plugin-react-hooks 
# eslintのinit時の質問にreactを使うと答えると以下の設定が追加される模様
# @echo "❗ESLintの設定ファイルに【eslint-plugin-react】の追加設定を行ってください❗"
# @echo "詳細は https://github.com/jsx-eslint/eslint-plugin-react を参照してください"
	@echo "❗ESLintの設定ファイルに【eslint-plugin-react-hooks】の追加設定を行ってください❗"
	@echo "詳細は https://www.npmjs.com/package/eslint-plugin-react-hooks を参照してください"
	
clean_eslint: 
	rm -rf *eslint.config*
	npm uninstall eslint @eslint/js eslint-plugin-react typescript-eslint
	make clean-eslint-react
	make re-i

clean_eslint_react: 
	npm uninstall eslint-plugin-react eslint-plugin-react-hooks

clean_eslint_and_react:
	make clean-eslint
	make clean-eslint-react

# --- Prettier ---
# ESLintの設定ファイルに追加設定が必要！詳しくは以下かメモを参照。
# https://github.com/prettier/eslint-config-prettier
# first
up_prettier: .prettierrc .prettierignore
	npm install --save-dev --save-exact prettier
	npm i -D eslint-config-prettier
	@echo "❗ESLintの設定ファイルに【prettier】の追加設定を行ってください❗"
	@echo "詳細は https://github.com/prettier/eslint-config-prettier を参照してください"

.prettierrc:
	node --eval "fs.writeFileSync('.prettierrc','{}\n')"

.prettierignore:
	touch .prettierignore

clean_prettier:
	rm -rf .prettierrc .prettierignore 
	npm uninstall -D prettier eslint-config-prettier
	make re-i

# --- Vite ---
# viteのinitでeslintは自動で入るが、prettierは入らない
my_vite_app = app
up_vite:
	npm create vite@latest ${my_vite_app} -- --template react-ts

# --- node_modules ---
re-i:
	rm -r node_modules
	npm i

# --- Clasp ---
clasp-install:
	npm i @google/clasp -g
	clasp login

clasp-clone:
	@echo "clone prod"
	cd ${LLM_EXAM_GAS_DIR}/prod && clasp clone ${LLM_EXAM_GAS_ID_PROD}

clasp-clone-dev:
	@echo "clone dev"
	cd ${LLM_EXAM_GAS_DIR}/dev && clasp clone ${LLM_EXAM_GAS_ID_DEV}

clasp-create:
	mkdir app
	cd app \
	&& clasp create --title "ClaspApp" --type standalone \
	&& touch main.ts \
	&& code main.ts

# --- AWS CDK ---

account = 737276082677
region = ap-northeast-1
cdk-project = my-project

# NOTE: npmとTypeScriptは勝手に入る
up-cdk:
	npm install -g aws-cdk
	mkdir ${cdk-project}
	cd ${cdk-project} \
	&& cdk init app --language typescript

cdk-bs:
	cdk bootstrap aws://${account}/${region}

# NodejsFunctionでTypeScriptをコンパイルする場合はesbuildのインストールが推奨
setup-ts-lambda:
	cd ${cdk-project} \
	&& npm install --save-dev esbuild@0