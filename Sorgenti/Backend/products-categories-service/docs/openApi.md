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

<h1 id="emporiolambda-backend-products-categories">products-categories</h1>

The products-categories service

## get__products

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/products?pageNumber=0&elementsNumber=0 \
  -H 'Accept: application/json'

```

`GET /products`

Return a list of products

<h3 id="get__products-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|array[string]|false|How the product should be filtered|
|pageNumber|query|integer(int64)|true|The page number to display|
|elementsNumber|query|integer(int64)|true|The elements number to display on the page|
|search|query|array[string]|false|Search for a product with text inside name or description|

#### Enumerated Values

|Parameter|Value|
|---|---|
|filter|category|
|filter|price|
|filter|availability|

> Example responses

> 200 Response

```json
[
  {
    "data": {
      "id": "string",
      "name": "string",
      "description": "string",
      "images": [
        "string"
      ],
      "quantity": 0,
      "price": 0,
      "available": true,
      "evidence": true,
      "category": [
        "string"
      ]
    }
  }
]
```

<h3 id="get__products-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully returned a list of products|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The product filter or search parameter does not fit the correct format.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|No products found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="get__products-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data](#schema#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data)|false|none|none|
|»» id|string|true|none|none|
|»» name|string|true|none|none|
|»» description|string|false|none|none|
|»» images|[string]|false|none|none|
|»» quantity|integer(int32)|true|none|none|
|»» price|integer(int64)|true|none|none|
|»» available|boolean|false|none|none|
|»» evidence|boolean|false|none|none|
|»» category|[string]|true|none|none|

Status Code **400**

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

<aside class="success">
This operation does not require authentication
</aside>

## post__products

> Code samples

```shell
# You can also use wget
curl -X POST https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/products \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /products`

Add a new product and return it

> Body parameter

```json
{
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "images": [
      "string"
    ],
    "quantity": 0,
    "price": 0,
    "available": true,
    "evidence": true,
    "category": [
      "string"
    ]
  }
}
```

<h3 id="post__products-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|The product to create|
|» data|body|[#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data](#schema#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data)|false|none|
|»» id|body|string|true|none|
|»» name|body|string|true|none|
|»» description|body|string|false|none|
|»» images|body|[string]|false|none|
|»» quantity|body|integer(int32)|true|none|
|»» price|body|integer(int64)|true|none|
|»» available|body|boolean|false|none|
|»» evidence|body|boolean|false|none|
|»» category|body|[string]|true|none|

> Example responses

> 201 Response

```json
{
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "images": [
      "string"
    ],
    "quantity": 0,
    "price": 0,
    "available": true,
    "evidence": true,
    "category": [
      "string"
    ]
  }
}
```

<h3 id="post__products-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successfully created the product and returned|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The product does not fit the correct format.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="post__products-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data](#schema#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data)|false|none|none|
|»» id|string|true|none|none|
|»» name|string|true|none|none|
|»» description|string|false|none|none|
|»» images|[string]|false|none|none|
|»» quantity|integer(int32)|true|none|none|
|»» price|integer(int64)|true|none|none|
|»» available|boolean|false|none|none|
|»» evidence|boolean|false|none|none|
|»» category|[string]|true|none|none|

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
oAuth ( Scopes: writeAdmin )
</aside>

## get__products_{productId}

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/products/{productId} \
  -H 'Accept: application/json'

```

`GET /products/{productId}`

Return a product by id

<h3 id="get__products_{productid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|string|true|The id of the product|

> Example responses

> 200 Response

```json
{
  "data": {
    "token": {
      "data": {
        "id": "string",
        "name": "string",
        "description": "string",
        "images": [
          "string"
        ],
        "quantity": 0,
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
}
```

<h3 id="get__products_{productid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully returned a product by id|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The product id does not fit the correct format.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Product not found with specified id.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="get__products_{productid}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|object|false|none|none|
|»» token|object|true|none|none|
|»»» data|[#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data](#schema#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data)|false|none|none|
|»»»» id|string|true|none|none|
|»»»» name|string|true|none|none|
|»»»» description|string|false|none|none|
|»»»» images|[string]|false|none|none|
|»»»» quantity|integer(int32)|true|none|none|
|»»»» price|integer(int64)|true|none|none|
|»»»» available|boolean|false|none|none|
|»»»» evidence|boolean|false|none|none|
|»»»» category|[string]|true|none|none|
|»»» timeout|string(date-time)|false|none|none|
|»» hmac|string(byte)|true|none|none|

Status Code **400**

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

<aside class="success">
This operation does not require authentication
</aside>

## delete__products_{productId}

> Code samples

```shell
# You can also use wget
curl -X DELETE https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/products/{productId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`DELETE /products/{productId}`

Delete a product by id

<h3 id="delete__products_{productid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|string|true|The id of the product|

> Example responses

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="delete__products_{productid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully deleted a product by id|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The product id does not fit the correct format.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|No authentication information was given, denied|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Product not found with specified id.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="delete__products_{productid}-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

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
oAuth ( Scopes: writeAdmin )
</aside>

## patch__products_{productId}

> Code samples

```shell
# You can also use wget
curl -X PATCH https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/products/{productId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`PATCH /products/{productId}`

Update some product's field(s) and return it

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "images": [
    "string"
  ],
  "quantity": 0,
  "price": 0,
  "available": true,
  "evidence": true,
  "discount": 0,
  "category": [
    "string"
  ]
}
```

<h3 id="patch__products_{productid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|string|true|The id of the product|
|body|body|object|true|The field(s) to update|

> Example responses

> 200 Response

```json
{
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "images": [
      "string"
    ],
    "quantity": 0,
    "price": 0,
    "available": true,
    "evidence": true,
    "category": [
      "string"
    ]
  }
}
```

<h3 id="patch__products_{productid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully created the product and returned|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The product id or request body does not fit the correct format.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|No authentication information was given, denied|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Product not found with specified id.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="patch__products_{productid}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data](#schema#/paths/~1products/get/responses/200/content/application~1json/schema/items/properties/data)|false|none|none|
|»» id|string|true|none|none|
|»» name|string|true|none|none|
|»» description|string|false|none|none|
|»» images|[string]|false|none|none|
|»» quantity|integer(int32)|true|none|none|
|»» price|integer(int64)|true|none|none|
|»» available|boolean|false|none|none|
|»» evidence|boolean|false|none|none|
|»» category|[string]|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

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
oAuth ( Scopes: writeAdmin )
</aside>

## get__categories

> Code samples

```shell
# You can also use wget
curl -X GET https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/categories \
  -H 'Accept: application/json'

```

`GET /categories`

Return a list of product categories

<h3 id="get__categories-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|search|query|array[string]|false|Search for a product category name|

> Example responses

> 200 Response

```json
{
  "data": [
    "string"
  ]
}
```

<h3 id="get__categories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully returned a list of product categories|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Categories not found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="get__categories-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[string]|false|none|none|

Status Code **404**

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

## post__categories

> Code samples

```shell
# You can also use wget
curl -X POST https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/categories \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`POST /categories`

Create a new product category

> Body parameter

```json
{
  "category": "string"
}
```

<h3 id="post__categories-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|The category to create|
|» category|body|string|false|none|

> Example responses

> 201 Response

```json
{
  "data": "string"
}
```

<h3 id="post__categories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successfully created a new product category|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The category does not fit the correct format.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="post__categories-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|string|false|none|none|

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
oAuth ( Scopes: writeAdmin )
</aside>

## delete__categories_{categoryName}

> Code samples

```shell
# You can also use wget
curl -X DELETE https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/categories/{categoryName} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`DELETE /categories/{categoryName}`

Delete a product category

<h3 id="delete__categories_{categoryname}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryName|path|string|true|The name of the product category|

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="delete__categories_{categoryname}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully deleted a product category|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The category name does not fit the correct format.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|A category with the specified name was not found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="delete__categories_{categoryname}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|string|false|none|none|

Status Code **400**

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
oAuth ( Scopes: writeAdmin )
</aside>

## put__categories_{categoryName}

> Code samples

```shell
# You can also use wget
curl -X PUT https://app.swaggerhub.com/apis/NotOnlyStudents/Backend/0.0.1/categories/{categoryName} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

`PUT /categories/{categoryName}`

Update a product category

> Body parameter

```json
{
  "category": "string"
}
```

<h3 id="put__categories_{categoryname}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryName|path|string|true|The name of the product category|
|body|body|object|true|The category to update with|
|» category|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="put__categories_{categoryname}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully created a new product category|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The category name does not fit the correct format.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Authorization information is missing or invalid.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|A category with the specified name was not found.|Inline|
|5XX|Unknown|Unexpected error.|Inline|

<h3 id="put__categories_{categoryname}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|string|false|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

Status Code **401**

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
oAuth ( Scopes: writeAdmin )
</aside>

