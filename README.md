# anonbot_func

## Бот для телеги за 15 минут
Юзает Firebase Cloud Functions для обработки запросов Телеграм бота.
По сути вебхуки позволяют не хранить token для доступа к API, а отправлять ответы на запрос с вебхука.

## Конфигурация
После деплоя нужно зарегистрировать функцию как вебхук послав POST запрос любым вашим любимым способом на api.telegram.org (ссылка на доку - [тык](https://core.telegram.org/bots/api#setwebhook))

```bash

curl -XPOST https://api.telegram.org/bot$TOKEN/setWebhook?url=$FUNC_URL

```
Вместо $TOKEN и $FUNC_URL должны быть токен для телеграм бота и ссылка на фукнцию в Firebase соответственно
