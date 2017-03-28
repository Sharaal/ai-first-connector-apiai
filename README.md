[![Dependency Status](https://david-dm.org/dragonprojects/ai-connector-apiai.svg)](https://david-dm.org/dragonprojects/ai-connector-apiai)
[![devDependency Status](https://david-dm.org/dragonprojects/ai-connector-apiai/dev-status.svg)](https://david-dm.org/dragonprojects/ai-connector-apiai?type=dev)

Connector which transforms the API.ai specific JSON format in the request to an internal AI JSON format and back for the response.

# Example Workflow

## API.ai Request

```json
{
  "id": "67f7a66b-e03b-46b6-adf0-504d243a54c2",
  "timestamp": "2017-03-28T12:42:13.521Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "new assets",
    "speech": "",
    "action": "",
    "actionIncomplete":false,
    "parameters": {
      "genre": ""
    },
    "contexts": [],
    "metadata": {
      "intentId": "f07ce4b1-2199-4f10-8ea3-f176b10fb788",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "false",
      "intentName": "newAssets"
    },
    "fulfillment": {
      "speech": "Sorry, there isn't currently any new content available",
      "messages": [
        {
          "type":0,
          "speech": "Sorry, there isn't currently any new content available"
        }
      ]
    },
    "score":0.77
  },
  "status": {
    "code":200,
    "errorType": "success"
  },
  "sessionId": "321fd8b9-5407-4c9f-94e6-4e4f3047e4c7",
  "originalRequest":null
}
```

## AI Request

```json
{
  "id": "67f7a66b-e03b-46b6-adf0-504d243a54c2",
  "locale": "en",
  "name": "newAssets",
  "params": {
    "genre": ""
  },
  "session": {},
  "user": {
    "id": "",
    "accessToken": ""
  }
}
```

## AI Response

```json
{
  "session": {
    "pageStart":1,
    "assetId":17754527,
    "genre": "",
    "intent": {
      "name": "newAssets",
      "params": {
        "genre": ""
      }
    }
  },
  "say": "Affenkönig",
  "display": {
    "title": "Affenkönig",
    "text": "Eine zügellose, ausgelassene Komödie über einen Lebemann, der seine ehemaligen Schulkameraden zum Feiern nach Südfrankreich einlädt. Eine provozierende Satire mit bitterbösen Blick auf das Lebensgefühl von Männern jenseits der 40."
  }
}
```

## API.ai Response

```json
{
  "speech": "Affenkönig",
  "displayText": "Affenkönig: Eine zügellose, ausgelassene Komödie über einen Lebemann, der seine ehemaligen Schulkameraden zum Feiern nach Südfrankreich einlädt. Eine provozierende Satire mit bitterbösen Blick auf das Lebensgefühl von Männern jenseits der 40.",
  "contextOut": [
    {
      "name": "session",
      "lifespan":1,
      "parameters": {
        "pageStart":1,
        "assetId":17754527,
        "genre": "",
        "intent": {
          "name": "newAssets",
          "params": {
            "genre": ""
          }
        },
        "genre.original": ""
      }
    }
  ]
}
```
