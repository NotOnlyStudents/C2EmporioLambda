---
title: EmporioLambda Backend v0.1.0
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

<h1 id="emporiolambda-backend">EmporioLambda Backend v0.1.0</h1>

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

<h1 id="emporiolambda-backend-carts">carts</h1>

The carts service

## post__cart

> Code samples

```shell
# You can also use wget
curl -X POST https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/cart \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /cart`

Add a new product to the buyer's cart

> Body parameter

```json
{
  "token": {
    "data": {
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
    },
    "timeout": "2019-08-24T14:15:22Z"
  },
  "hmac": "stringstringstringstringstringstringstringst"
}
```

<h3 id="post__cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» token|body|object|true|none|
|»» data|body|[#/paths/~1cart/post/requestBody/content/application~1json/schema/properties/token/properties/data](#schema#/paths/~1cart/post/requestbody/content/application~1json/schema/properties/token/properties/data)|false|none|
|»»» id|body|string|true|none|
|»»» name|body|string|true|none|
|»»» description|body|string|false|none|
|»»» images|body|[string]|false|none|
|»»» quantity|body|integer(int32)|true|none|
|»»» discount|body|integer(int32)|false|none|
|»»» price|body|integer(int64)|true|none|
|»»» available|body|boolean|false|none|
|»»» evidence|body|boolean|false|none|
|»»» category|body|[string]|true|none|
|»» timeout|body|string(date-time)|false|none|
|» hmac|body|string(byte)|true|none|

> Example responses

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="post__cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successfull modification of the cart|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|No authentication information was given, denied|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Wrong permissions, denied|Inline|
|5XX|Unknown|Unexpected server error|Inline|

<h3 id="post__cart-responseschema">Response Schema</h3>

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

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: writeUser )
</aside>

## get__cart

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/cart \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`GET /cart`

Obtain information about a user personal cart

> Example responses

> 200 Response

```json
{
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
}
```

<h3 id="get__cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully returned a cart|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|No authentication information was given, denied|Inline|
|5XX|Unknown|Unexpected server error|Inline|

<h3 id="get__cart-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» token|object|true|none|none|
|»» data|object|false|none|none|
|»»» products|[[#/paths/~1cart/post/requestBody/content/application~1json/schema/properties/token/properties/data](#schema#/paths/~1cart/post/requestbody/content/application~1json/schema/properties/token/properties/data)]|true|none|none|
|»»»» id|string|true|none|none|
|»»»» name|string|true|none|none|
|»»»» description|string|false|none|none|
|»»»» images|[string]|false|none|none|
|»»»» quantity|integer(int32)|true|none|none|
|»»»» discount|integer(int32)|false|none|none|
|»»»» price|integer(int64)|true|none|none|
|»»»» available|boolean|false|none|none|
|»»»» evidence|boolean|false|none|none|
|»»»» category|[string]|true|none|none|
|»» timeout|string(date-time)|false|none|none|
|» hmac|string(byte)|true|none|none|

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
oAuth ( Scopes: read )
</aside>

## patch__cart_{productId}

> Code samples

```shell
# You can also use wget
curl -X PATCH https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/cart/{productId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`PATCH /cart/{productId}`

Edit a product quantity in the buyer's cart

> Body parameter

```json
{
  "quantity": 0
}
```

<h3 id="patch__cart_{productid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|string|true|The id of the desired product|
|body|body|object|true|none|
|» quantity|body|integer(int32)|false|none|

> Example responses

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="patch__cart_{productid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successfull modification of the product quantity in the cart|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|No authentication information was given, denied|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Wrong permissions, denied|Inline|
|5XX|Unknown|Unexpected server error|Inline|

<h3 id="patch__cart_{productid}-responseschema">Response Schema</h3>

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

Status Code **5XX**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oAuth ( Scopes: writeUser )
</aside>

