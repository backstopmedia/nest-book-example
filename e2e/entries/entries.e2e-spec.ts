import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { EntriesModule } from '../../src/modules/entry/entry.module';
import { EntriesService } from '../../src/modules/entry/entry.service';

describe('Entries', () => {
  let app: INestApplication;
  const mockEntriesService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [EntriesModule]
    })
      .overrideComponent(EntriesService)
      .useValue(mockEntriesService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET entries`, () => {
    return request(app.getHttpServer())
      .get('/entries')
      .expect(200)
      .expect({
        data: mockEntriesService.findAll()
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
