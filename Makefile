BOT_VERSION := $(shell jq -r .version package.json)

setup: setup-env compose-setup

setup-env:
	docker run --rm -v $(CURDIR):/app -w /app williamyeh/ansible:alpine3 ansible-playbook ansible/development.yml -i ansible/development -vv

setup-env-local:
	ansible-playbook ansible/development.yml -i ansible/development -vv

docker-build:
	docker pull codebattle/chat_bot:latest || true
	docker build \
				--cache-from=codebattle/chat_bot:$(BOT_VERSION) \
				--cache-from=codebattle/chat_bot:latest \
				--file Dockerfile \
				--tag codebattle/chat_bot:$(BOT_VERSION) \
				--tag codebattle/chat_bot:latest .

docker-push:
	docker push codebattle/chat_bot:$(BOT_VERSION)
	docker push codebattle/chat_bot:latest

start:
	yarn run start:health & yarn run start
