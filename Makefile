define GetFromPkg
	$(shell node -p "require('./package.json').$(1)")
endef

BOT_VERSION := $(call GetFromPkg,version)

setup: setup-env compose-setup

setup-env:
	docker run --rm -v $(CURDIR):/app -w /app williamyeh/ansible:alpine3 ansible-playbook ansible/development.yml -i ansible/development -vv

setup-env-local:
	ansible-playbook ansible/development.yml -i ansible/development -vv

docker-build-bot:
	docker pull codebattle/chat:latest || true
	docker build --target bot-image \
				--cache-from=codebattle/chat:$(BOT_VERSION) \
				--cache-from=codebattle/chat:latest \
				--file Dockerfile \
				--tag codebattle/chat:latest app \
				--tag codebattle/chat:$(BOT_VERSION)

docker-push-bot:
	docker push codebattle/chat:$(BOT_VERSION)
	docker push codebattle/chat:latest
