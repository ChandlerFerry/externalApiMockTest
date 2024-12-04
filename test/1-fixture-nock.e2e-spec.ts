import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as nock from 'nock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

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
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/getData (GET)', () => {
    return request(app.getHttpServer())
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
