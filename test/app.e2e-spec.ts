import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

/**
 * Prueba e2e de ejemplo (generada por el esquema de NestJS).
 *
 * Levanta la aplicación real con `AppModule` y hace una petición HTTP con
 * Supertest. Actualmente espera un `GET /` con `Hello World!`, una ruta que
 * Petora no expone; debe actualizarse para probar un endpoint real (por
 * ejemplo, `/api/petora/products`) antes de usarse como prueba de humo.
 */
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
