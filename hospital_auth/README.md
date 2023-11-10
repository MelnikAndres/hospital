
# Hospital JWT Auth API documentation

# Content
- [Objective](#objective)
- [Features](#features)
- [API Reference Endpoints](#api-reference-endpoints)
    - [Create new JWT](#create-new-jwt)
    - [Verify JWT](#verify-jwt)
- [Models](#models)
- [Errors](#errors)
- [Tech Stack](#tech-stack)

# Objective
Create an authentication system with JWT, to be used on a hospital appointment scheduler App. Should be able to create, validate and decode a token.



## Features

- Create JWT
- Validate JWT
- Decode JWT


## API Reference Endpoints

#### Create new JWT

```
  POST /sign
```
- Body structure (JSON)

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `payload` | `object` | **Required**. payload object|

- Payload structure

| Property | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `iss` | `string` | **Required**. issuer|
| `sub` | `string` | **Required**. subject|
| `exp` | `string` | **Required**. expiration time|
| `rl` | `string` | **Required**. role|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {"JWT":<access_token>,
        "expire":"5m", //expiration time
        "salt": "xxxxxxxx" //token security salt
        }
    ```
    - No payload
    ```
        HTTP/1.1 400 Bad Request
        Content-Type: application/json
        {ERROR_NO_PAYLOAD}
    ```
    - Invalid payload
    ```
        HTTP/1.1 400 Bad Request
        Content-Type: application/json
        {ERROR_PAYLOAD}
    ```
- Errors

    - see [ERROR_NO_PAYLOAD](#error-no-payload)
    - see [ERROR_PAYLOAD](#error-payload)


#### Verify JWT

```
  GET /verify
```
- Header structure

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization:`      | `string` | **Required**. token to validate|

- Response:
    - Valid request
    ```
        HTTP/1.1 200 OK
        Content-Type: application/json
        {PAYLOAD_MODEL}
    ```
    - No token
    ```
        HTTP/1.1 400 Bad Request
        Content-Type: application/json
        {ERROR_NO_TOKEN}
    ```
    - Invalid token
    ```
        HTTP/1.1 403 Forbidden
        Content-Type: application/json
        {ERROR_TOKEN}
    ```
- Models

    - see [PAYLOAD_MODEL](#payload-model)
- Errors

    - see [ERROR_NO_TOKEN](#error-no-token)
    - see [ERROR_TOKEN](#error-token)



# Models 

#### Payload model

```
PAYLOAD_MODEL
{
    iss: "hospital.com", //main app domain
    sub: "123", //user id
    exp: "5m",
    rl: "role",
    iat: 1629456789 //issued at
    sec: "anfi374nKJF84ngN5" //security invalidator
}
```
# Errors

#### Error no payload

```
ERROR_NO_PAYLOAD
{
    errors:["No payload provided"]
}
```

#### Error payload
May contain one or all errors
```
ERROR_PAYLOAD
{
    errors:["Invalid issuer",
    "Invalid subject",
    "Invalid expiration time",
    "Invalid role"]
}
```

#### Error no token

```
ERROR_NO_TOKEN
{
    errors:["No token provided"]
}
```

#### Error token
May contain one or all errors
```
ERROR_PAYLOAD
{
    errors:["Invalid signature",
    "Expired signature"]
}
```
## Tech Stack

**Server:** Node, Express