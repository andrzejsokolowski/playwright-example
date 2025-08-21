import { APIRequestContext, expect } from '@playwright/test';

export class JsonPlaceholderAPI {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getPosts() {
    const response = await this.request.get('/posts');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    return response.json();
  }

  async getPostById(id: number) {
    const response = await this.request.get(`/posts/${id}`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    return response.json();
  }

  async createPost(data: any) {
    const response = await this.request.post('/posts', { data });
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');
    return response.json();
  }

  async updatePost(id: number, data: any) {
    const response = await this.request.put(`/posts/${id}`, { data });
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    return response.json();
  }

  async deletePost(id: number) {
    const response = await this.request.delete(`/posts/${id}`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    return response.json();
  }
}
