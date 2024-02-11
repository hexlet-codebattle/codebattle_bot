compose:
  docker compose up app

compose-d:
  docker compose up -d app

compose-build:
  docker compsoe build app

compose-down:
  docker compose down -v || true

compose-kill:
  docker compose kill

compose-bash:
  docker compose run app bash

compose-install:
  docker compose run --rm --name codebattle_chat_app app 'yarn'
