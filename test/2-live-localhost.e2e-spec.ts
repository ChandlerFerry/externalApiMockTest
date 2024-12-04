import * as request from 'supertest';
import * as nock from 'nock';

describe('AppController (e2e)', () => {
  beforeEach(() => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/todos/1')
      .reply(200, {
        userId: 2,
        id: 2,
        title: 'mocked title',
        completed: true,
      });
  });

  it('/ (GET)', () => {
    return request('http://localhost:3000')
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/getData (GET)', () => {
    return request('http://localhost:3000')
      .get('/api/getData')
      .expect(200)
      .expect({
        userId: 2,
        id: 2,
        title: 'mocked title',
        completed: true,
      });
  });
});
