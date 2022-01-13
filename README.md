# bank-api-nodejs

## User Object

| Property | Type     | Description                                                  |
| -------- | -------- | ------------------------------------------------------------ |
| userId   | `String` | <p>Unique id </p>                                            |
| name     | `String` | <p>User name(should also be unique to prevent duplicates</p> |
| cash     | `Number` | <p>Default 0</p>                                             |
| credit   | `Number` | <p>Default 0</p>                                             |

## Create User

Creates a new user with the given name and returns the user object.

-   **URL**

    /users/

-   **Method:**

    `POST`

### Parameters - `Request Body Parameters`

| Name   | Type     | Description                                    |
| ------ | -------- | ---------------------------------------------- |
| name   | `String` | <p></p>                                        |
| cash   | `Number` | <p>Optional. Initial cash value. Default 0</p> |
| credit | `Number` | <p>Optional. Initial cash value. Default 0</p> |

## Update user(credit, balance)

Updates single user and returns the updated user object.

-   **URL**

    /users/:id

-   **Method:**

    `PUT`

### Parameters - `Request Body Parameters`

| Name   | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| name   | `String` | <p>Optional. The new value.</p> |
| cash   | `Number` | <p>Optional. The new value.</p> |
| credit | `Number` | <p>Optional. The new value.</p> |

## Transfer money

Gets the ids of the users to transfer money to/from and the amount to transfer.
Returns the 2 updated user objects.

-   **URL**

    /user/transfer

-   **Method:**

    `PUT`

### Parameters - `Request Body Parameters`

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| idSource | `String` | <p></p>     |
| cash     | `Number` | <p></p>     |
| idTarget | `String` | <p></p>     |

## **Show User**

Returns json data about a single user.

-   **URL**

    /users/:id

-   **Method:**

    `GET`

-   **URL Params**

    **Required:**

    `id=[integer]`

-   **Data Params**

    None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:** `{ id : 12, name : "Michael Bloom" }`

-   **Error Response:**

    -   **Code:** 404 NOT FOUND <br />
        **Content:** `{ error : "User doesn't exist" }`

    OR

    -   **Code:** 401 UNAUTHORIZED <br />
        **Content:** `{ error : "You are unauthorized to make this request." }`

-   **Sample Call:**

    ```javascript
    $.ajax({
        url: '/users/1',
        dataType: 'json',
        type: 'GET',
        success: function (r) {
            console.log(r);
        },
    });
    ```
