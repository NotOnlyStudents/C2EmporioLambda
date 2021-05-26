---
title: EmporioLambda Backend v0.1.1
language_tabs:
  - shell: curl
language_clients:
  - shell: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="emporiolambda-backend">EmporioLambda Backend v0.1.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

REST interfaces for EmporioLambda Backend

Base URLs:

* <a href="https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1">https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1</a>

* <a href="http://localhost:3000/dev">http://localhost:3000/dev</a>

* <a href="http://api.annoiato.net/test">http://api.annoiato.net/test</a>

* <a href="http://api.annoiato.net/staging">http://api.annoiato.net/staging</a>

# Authentication

- oAuth2 authentication. This API uses OAuth2.0 with implicit flow.

    - Flow: implicit
    - Authorization URL = [https://emporiolambda.auth.eu-west-1.amazoncognito.com/oauth2/authorize](https://emporiolambda.auth.eu-west-1.amazoncognito.com/oauth2/authorize)

|Scope|Scope Description|
|---|---|
|read|read for customers and admins|
|readAdmin|read only for admins|
|writeUser|edit data only for users|
|writeAdmin|edit data only for admins|

<h1 id="emporiolambda-backend-payments-orders">payments-orders</h1>

The payments-orders service

## post__orders

> Code samples

```shell
# You can also use wget
curl -X POST https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /orders`

Create a new order for the user requesting

> Body parameter

```json
{
  "address": {
    "id": "string",
    "nation": "string",
    "city": "string",
    "address": "string",
    "cap": 0
  },
  "cart-token": {
    "token": {
      "data": {
        "products": [
          {
            "id": "string",
            "name": "string",
            "description": "string",
            "images": [
              "string"
            ],
            "quantity": 0,
            "discount": 0,
            "price": 0,
            "available": true,
            "evidence": true,
            "category": [
              "string"
            ]
          }
        ]
      },
      "timeout": "2019-08-24T14:15:22Z"
    },
    "hmac": "stringstringstringstringstringstringstringst"
  },
  "additionalInfo": "string"
}
```

<h3 id="post__orders-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» address|body|[#/paths/~1orders/post/requestBody/content/application~1json/schema/properties/address](#schema#/paths/~1orders/post/requestbody/content/application~1json/schema/properties/address)|true|none|
|»» id|body|string|true|none|
|»» nation|body|string|true|none|
|»» city|body|string|true|none|
|»» address|body|string|true|none|
|»» cap|body|number|true|none|
|» cart-token|body|object|false|none|
|»» token|body|object|true|none|
|»»» data|body|object|false|none|
|»»»» products|body|[[#/paths/~1orders/get/responses/200/content/application~1json/schema/items/properties/products/items](#schema#/paths/~1orders/get/responses/200/content/application~1json/schema/items/properties/products/items)]|true|none|
|»»»»» id|body|string|true|none|
|»»»»» name|body|string|true|none|
|»»»»» description|body|string|false|none|
|»»»»» images|body|[string]|false|none|
|»»»»» quantity|body|integer(int32)|true|none|
|»»»»» discount|body|integer(int32)|false|none|
|»»»»» price|body|integer(int64)|true|none|
|»»»»» available|body|boolean|false|none|
|»»»»» evidence|body|boolean|false|none|
|»»»»» category|body|[string]|true|none|
|»»» timeout|body|string(date-time)|false|none|
|»» hmac|body|string(byte)|true|none|
|» additionalInfo|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "data": {
    "sessionId": "string"
  }
}
```

<h3 id="post__orders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The checkout session was succesfully opened and the order created|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The given order is not in the correct format.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="post__orders-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|object|false|none|none|
|»» sessionId|string|false|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: writeUser writeAdmin )
</aside>

## get__orders

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/orders \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /orders`

Return a list of orders filtered according to given parameters

<h3 id="get__orders-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|status|query|[#/paths/~1orders/get/parameters/0/schema](#schema#/paths/~1orders/get/parameters/0/schema)|false|Filter orders that match the given status|
|start|query|string(date-time)|false|Filter orders that were created on or after the specified date|
|end|query|string(date-time)|false|Filter orders that were created before or on the specified date|
|email|query|string(email)|false|Filter orders made by a specific user (only vendor)|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|fulfilled|
|status|new|

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "customerEmail": "user@example.com",
    "address": {
      "id": "string",
      "nation": "string",
      "city": "string",
      "address": "string",
      "cap": 0
    },
    "products": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "images": [
          "string"
        ],
        "quantity": 0,
        "discount": 0,
        "price": 0,
        "available": true,
        "evidence": true,
        "category": [
          "string"
        ]
      }
    ],
    "additionalInfo": "string",
    "date": "2019-08-24T14:15:22Z",
    "status": "fulfilled"
  }
]
```

<h3 id="get__orders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully returned a list of orders|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad parameter format.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Only vendor can filter orders by User|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|No orders with the specified filters where found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="get__orders-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[#/paths/~1orders/get/responses/200/content/application~1json/schema/items](#schema#/paths/~1orders/get/responses/200/content/application~1json/schema/items)]|false|none|none|
|» id|string|true|none|none|
|» customerEmail|string(email)|false|none|none|
|» address|[#/paths/~1orders/post/requestBody/content/application~1json/schema/properties/address](#schema#/paths/~1orders/post/requestbody/content/application~1json/schema/properties/address)|true|none|none|
|»» id|string|true|none|none|
|»» nation|string|true|none|none|
|»» city|string|true|none|none|
|»» address|string|true|none|none|
|»» cap|number|true|none|none|
|» products|[[#/paths/~1orders/get/responses/200/content/application~1json/schema/items/properties/products/items](#schema#/paths/~1orders/get/responses/200/content/application~1json/schema/items/properties/products/items)]|true|none|none|
|»» id|string|true|none|none|
|»» name|string|true|none|none|
|»» description|string|false|none|none|
|»» images|[string]|false|none|none|
|»» quantity|integer(int32)|true|none|none|
|»» discount|integer(int32)|false|none|none|
|»» price|integer(int64)|true|none|none|
|»» available|boolean|false|none|none|
|»» evidence|boolean|false|none|none|
|»» category|[string]|true|none|none|
|» additionalInfo|string|false|none|none|
|» date|string(date-time)|false|none|none|
|» status|[#/paths/~1orders/get/parameters/0/schema](#schema#/paths/~1orders/get/parameters/0/schema)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|fulfilled|
|status|new|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: read readAdmin )
</aside>

## get__orders_{orderId}

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/orders/{orderId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /orders/{orderId}`

Return an order by id

<h3 id="get__orders_{orderid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|orderId|path|string|true|The id of the desired order|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "customerEmail": "user@example.com",
  "address": {
    "id": "string",
    "nation": "string",
    "city": "string",
    "address": "string",
    "cap": 0
  },
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "images": [
        "string"
      ],
      "quantity": 0,
      "discount": 0,
      "price": 0,
      "available": true,
      "evidence": true,
      "category": [
        "string"
      ]
    }
  ],
  "additionalInfo": "string",
  "date": "2019-08-24T14:15:22Z",
  "status": "fulfilled"
}
```

<h3 id="get__orders_{orderid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully returned a order by id|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The order ID does not fit the correct format.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|An order with the specified ID was not found.|None|
|5XX|Unknown|Unexpected error.|None|

<h3 id="get__orders_{orderid}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|string|true|none|none|
|» customerEmail|string(email)|false|none|none|
|» address|[#/paths/~1orders/post/requestBody/content/application~1json/schema/properties/address](#schema#/paths/~1orders/post/requestbody/content/application~1json/schema/properties/address)|true|none|none|
|»» id|string|true|none|none|
|»» nation|string|true|none|none|
|»» city|string|true|none|none|
|»» address|string|true|none|none|
|»» cap|number|true|none|none|
|» products|[[#/paths/~1orders/get/responses/200/content/application~1json/schema/items/properties/products/items](#schema#/paths/~1orders/get/responses/200/content/application~1json/schema/items/properties/products/items)]|true|none|none|
|»» id|string|true|none|none|
|»» name|string|true|none|none|
|»» description|string|false|none|none|
|»» images|[string]|false|none|none|
|»» quantity|integer(int32)|true|none|none|
|»» discount|integer(int32)|false|none|none|
|»» price|integer(int64)|true|none|none|
|»» available|boolean|false|none|none|
|»» evidence|boolean|false|none|none|
|»» category|[string]|true|none|none|
|» additionalInfo|string|false|none|none|
|» date|string(date-time)|false|none|none|
|» status|[#/paths/~1orders/get/parameters/0/schema](#schema#/paths/~1orders/get/parameters/0/schema)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|fulfilled|
|status|new|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: read )
</aside>

## patch__orders_{orderId}

> Code samples

```shell
# You can also use wget
curl -X PATCH https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/orders/{orderId} \
  -H 'Authorization: Bearer {access-token}'

```

`PATCH /orders/{orderId}`

Set an order to fulfilled

<h3 id="patch__orders_{orderid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|orderId|path|string|true|The id of the desired order|

<h3 id="patch__orders_{orderid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully updated the order status|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad status format.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Only vendor can perform this action.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|An order with the specified ID was not found.|None|
|5XX|Unknown|Unexpected error.|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: writeAdmin )
</aside>

## post__stripe-hook

> Code samples

```shell
# You can also use wget
curl -X POST https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/stripe-hook \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

`POST /stripe-hook`

Webhook to recieve payment events from stripe API

> Body parameter

```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "string"
    }
  }
}
```

<h3 id="post__stripe-hook-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» type|body|string|false|none|
|» data|body|object|false|none|
|»» object|body|object|false|none|
|»»» id|body|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» type|payment_intent.succeeded|
|» type|payment_intent.payment_failed|
|» type|payment_intent.canceled|

> Example responses

> 403 Response

```json
{
  "message": "string"
}
```

<h3 id="post__stripe-hook-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Acknowledgment of the recieved  event|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access prohibited, only Stripe API can access this backend call|Inline|
|5XX|Unknown|Unexpected server error|Inline|

<h3 id="post__stripe-hook-responseschema">Response Schema</h3>

Status Code **403**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

