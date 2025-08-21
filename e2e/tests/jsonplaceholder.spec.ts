import { test, expect } from '../fixtures/base-fixture';

test('retrieve all posts', async ({ api }) => {
  const posts = await api.jsonplaceholder.getPosts();
  expect(posts).toBeInstanceOf(Array);
  expect(posts.length).toBeGreaterThan(0);
  expect(posts[0]).toHaveProperty('userId');
  expect(posts[0]).toHaveProperty('id');
  expect(posts[0]).toHaveProperty('title');
  expect(posts[0]).toHaveProperty('body');
});

test('retrieve a single post by ID', async ({ api }) => {
  const postId = 1;
  const post = await api.jsonplaceholder.getPostById(postId);
  expect(post).toHaveProperty('id', postId);
  expect(post).toHaveProperty('userId');
  expect(post).toHaveProperty('title');
  expect(post).toHaveProperty('body');
});

test('return 404 for an invalid post ID', async ({ request }) => {
  const invalidPostId = 2147483648;
  const response = await request.get(`/posts/${invalidPostId}`);
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({});
});

test('create a new post', async ({ api }) => {
  const newPost = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };
  const createdPost = await api.jsonplaceholder.createPost(newPost);
  expect(createdPost).toHaveProperty('id');
  expect(createdPost).toHaveProperty('title', newPost.title);
  expect(createdPost).toHaveProperty('body', newPost.body);
  expect(createdPost).toHaveProperty('userId', newPost.userId);
});

test('update an existing post', async ({ api }) => {
  const postId = 1;
  const updatedData = {
    id: postId,
    title: 'updated title',
    body: 'updated body',
    userId: 1,
  };
  const updatedPost = await api.jsonplaceholder.updatePost(postId, updatedData);
  expect(updatedPost).toHaveProperty('id', postId);
  expect(updatedPost).toHaveProperty('title', updatedData.title);
  expect(updatedPost).toHaveProperty('body', updatedData.body);
});

test('delete an existing post', async ({ api }) => {
  const postId = 1;
  const response = await api.jsonplaceholder.deletePost(postId);
  expect(response).toEqual({});
});

test('handle unsupported method (DELETE on /posts without ID)', async ({ request }) => {
  const response = await request.delete('/posts');
  expect(response.status()).toBe(404);
});

test('handle invalid content-type for POST', async ({ request }) => {
  const response = await request.post('/posts', {
    headers: { 'Content-Type': 'application/xml' },
    data: '<post><title>foo</title><body>bar</body><userId>1</userId></post>',
  });
  // still creates the post with 201 status - but it shouldn't.
  expect(response.status()).toBe(415);
});

test('handle large payload for post creation', async ({ api }) => {
  const largeString = 'a'.repeat(10000);
  const newPost = {
    title: 'large payload test',
    body: largeString,
    userId: 1,
  };
  const createdPost = await api.jsonplaceholder.createPost(newPost);
  expect(createdPost).toHaveProperty('id');
  expect(createdPost).toHaveProperty('body', largeString);
});

//tests from JSON input
const testData = require('../test-data/posts.json');
for (const data of testData) {
  test(`create a post with data: ${data.title}`, async ({ api }) => {
    const createdPost = await api.jsonplaceholder.createPost(data);
    expect(createdPost).toHaveProperty('id');
    expect(createdPost).toHaveProperty('title', data.title);
    expect(createdPost).toHaveProperty('body', data.body);
    expect(createdPost).toHaveProperty('userId', data.userId);
  });
}
