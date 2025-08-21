# API Test Cases for JSONPlaceholder

## 1. Get All Posts (Positive Scenario)

- **Test Case Name:** Verify successful retrieval of all posts
- **Description:** This test verifies that a GET request to `/posts` returns a 200 OK status and a non-empty array of posts.
- **Precondition:** API is accessible.
- **Steps:**
  1. Send a GET request to `https://jsonplaceholder.typicode.com/posts`.
- **Expected Result:**
  - HTTP Status Code is 200.
  - Response body is an array.
  - Response body is not empty.

## 2. Get Single Post by ID (Positive Scenario)

- **Test Case Name:** Verify successful retrieval of a single post by ID
- **Description:** This test verifies that a GET request to `/posts/{id}` with a valid ID returns a 200 OK status and the correct post object.
- **Precondition:** API is accessible and a post with ID 1 exists.
- **Steps:**
  1. Send a GET request to `https://jsonplaceholder.typicode.com/posts/1`.
- **Expected Result:**
  - HTTP Status Code is 200.
  - Response body is an object with `id` equal to 1.
  - Response body contains `userId`, `id`, `title`, and `body` fields.

## 3. Get Single Post by Invalid ID (Negative Scenario)

- **Test Case Name:** Verify handling of invalid post ID
- **Description:** This test verifies that a GET request to `/posts/{id}` with an invalid/non-existent ID returns a 404 Not Found status.
- **Precondition:** API is accessible.
- **Steps:**
  1. Send a GET request to `https://jsonplaceholder.typicode.com/posts/99999`.
- **Expected Result:**
  - HTTP Status Code is 404.
  - Response body is empty or an empty object.

## 4. Create a New Post (Positive Scenario)

- **Test Case Name:** Verify successful creation of a new post
- **Description:** This test verifies that a POST request to `/posts` with valid data creates a new post and returns a 201 Created status.
- **Precondition:** API is accessible.
- **Steps:**
  1. Send a POST request to `https://jsonplaceholder.typicode.com/posts` with a valid JSON payload (e.g., `{"title": "foo", "body": "bar", "userId": 1}`).
- **Expected Result:**
  - HTTP Status Code is 201.
  - Response body contains the submitted data plus a new `id`.

## 5. Create a New Post with Missing Fields (Negative Scenario)

- **Test Case Name:** Verify handling of missing fields during post creation
- **Description:** This test verifies that a POST request to `/posts` with missing required fields returns an appropriate error status (e.g., 422 Unprocessable Entity or 400 Bad Request, though JSONPlaceholder might still create it).
- **Precondition:** API is accessible.
- **Steps:**
  1. Send a POST request to `https://jsonplaceholder.typicode.com/posts` with a payload missing `title` or `body` (e.g., `{"userId": 1}`).
- **Expected Result:**
  - HTTP Status Code is not 201 (e.g., 400 or 422 if API validates, or 201 if API auto-fills/ignores).
  - (Note: JSONPlaceholder often returns 201 even with missing fields, as it's a fake API. Real APIs would typically return an error.)

## 6. Update an Existing Post (Positive Scenario)

- **Test Case Name:** Verify successful update of an existing post
- **Description:** This test verifies that a PUT request to `/posts/{id}` with valid data updates an existing post and returns a 200 OK status.
- **Precondition:** API is accessible and a post with ID 1 exists.
- **Steps:**
  1. Send a PUT request to `https://jsonplaceholder.typicode.com/posts/1` with a valid JSON payload (e.g., `{"id": 1, "title": "updated title", "body": "updated body", "userId": 1}`).
- **Expected Result:**
  - HTTP Status Code is 200.
  - Response body reflects the updated data.

## 7. Delete an Existing Post (Positive Scenario)

- **Test Case Name:** Verify successful deletion of an existing post
- **Description:** This test verifies that a DELETE request to `/posts/{id}` successfully deletes a post and returns a 200 OK status.
- **Precondition:** API is accessible and a post with ID 1 exists.
- **Steps:**
  1. Send a DELETE request to `https://jsonplaceholder.typicode.com/posts/1`.
- **Expected Result:**
  - HTTP Status Code is 200.
  - Response body is an empty object.

## 8. Unsupported Method (Negative Scenario - DELETE on /posts without ID)

- **Test Case Name:** Verify handling of unsupported HTTP method
- **Description:** This test verifies that attempting an unsupported HTTP method (e.g., DELETE) on a collection endpoint like `/posts` (without an ID) returns an appropriate error status (e.g., 405 Method Not Allowed).
- **Precondition:** API is accessible.
- **Steps:**
  1. Send a DELETE request to `https://jsonplaceholder.typicode.com/posts`.
- **Expected Result:**
  - HTTP Status Code is 415 (JSONPlaceholder returns 201 for this, not 415).
  - (Note: JSONPlaceholder's behavior might differ from a real API's 405 for unsupported methods on collections.)

## 9. Invalid Content-Type for POST (Negative Scenario)

- **Test Case Name:** Verify handling of invalid Content-Type for POST
- **Description:** This test verifies that a POST request to `/posts` with an unsupported `Content-Type` header returns an appropriate error status (e.g., 415 Unsupported Media Type).
- **Precondition:** API is accessible.
- **Steps:**
  1. Send a POST request to `https://jsonplaceholder.typicode.com/posts` with `Content-Type: application/xml` and a payload.
- **Expected Result:**
  - HTTP Status Code is 415 BUT JSONPlaceholder ignores Content-Type and processes the request (I will treat this as a intentional non-intentional issue.)
  - JSONPlaceholder is lenient and might not enforce `Content-Type` as a real API would.

## 10. Large Payload for POST (Edge Case)

- **Test Case Name:** Verify handling of large payload for post creation
- **Description:** This test verifies that the API can handle a POST request with a very large payload without issues.
- **Precondition:** API is accessible.
- **Steps:**
  1. Generate a very large string (e.g., 10,000 characters).
  2. Send a POST request to `https://jsonplaceholder.typicode.com/posts` with this large string as the `body` field.
- **Expected Result:**
  - HTTP Status Code is 201.
  - Response body contains the submitted large payload (or a truncated version if the API has limits).
