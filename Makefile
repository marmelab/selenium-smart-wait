install:
	yarn

clean:
	rm -rf lib

build: clean
	NODE_ENV=production ./node_modules/.bin/babel \
		--out-dir=lib \
		--stage=0 \
		--ignore=*.spec.js \
		src

test-unit:
	NODE_ENV=test ./node_modules/.bin/nyc \
		./node_modules/.bin/mocha \
		--opts ./mocha.opts \
		"./src/**/*.spec.js"

install-selenium:
	echo "Installing Selenium server"
	./node_modules/.bin/selenium-standalone install --version=3.3.0 --drivers.chrome.version=2.24

watch-test:
	NODE_ENV=test ./node_modules/.bin/nyc \
		./node_modules/.bin/mocha \
		--opts ./mocha.opts \
		--watch \
		"./src/**/*.spec.js"

test-e2e: ## Run e2e selenium tests
	NODE_ENV=test SELENIUM_BROWSER_BINARY_PATH="./node_modules/selenium-standalone/.selenium/chromedriver/2.24-x64-chromedriver" \
		./node_modules/.bin/mocha \
		--require babel-polyfill \
		--compilers="js:babel-core/register" \
		--recursive \
		"./e2e/tests/**/*.spec.js"

test: test-unit test-e2e

lint:
	./node_modules/.bin/eslint ./src
