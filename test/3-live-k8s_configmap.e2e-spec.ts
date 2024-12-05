import * as request from 'supertest';
import * as nock from 'nock';

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request('http://localhost:3030')
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/getData (GET)', () => {
    return request('http://localhost:3030')
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
