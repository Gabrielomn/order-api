import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Order } from 'src/database/models/order.schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('order creation', () => {
    it('/order (POST)', async () => {
      const order = await request(app.getHttpServer())
        .post('/order')
        .send({
          "value": 122,
          "items":[
              {
                  "name": "hat",
                  "amount": 3,
                  "value": 21
              },
              {
                  "name":"pants",
                  "amount": 1,
                  "value": 101
              }
          ]
        })
        .expect(201)
        return order;
    });

    it('/order (POST)', async () => {
      const order = await request(app.getHttpServer())
        .post('/order')
        .send({
          "items":[
              {
                  "name": "hat",
                  "amount": 3,
                  "value": 21
              },
              {
                  "name":"pants",
                  "amount": 1,
                  "value": 101
              }
          ]
        })
        .expect(400)
      return order;
    });
  })


  describe('payment accepted', () => {
    it('/order/pay/:id (PUT)', async () => {
      const result = await request(app.getHttpServer())
        .post('/order')
        .send({
          "value": 182,
          "items":[
              {
                  "name": "hat",
                  "amount": 3,
                  "value": 75
              },
              {
                  "name":"boot",
                  "amount": 1,
                  "value": 127
              }
          ]
        })
        .expect(201).then((result) => {
          return request(app.getHttpServer())
          .put(`/order/pay/${result.body._id}`)
          .send({
              creditCard: "1121-2222-3333-4444",
              expirationDate: "12/22",
              verificationDigits: 741
          })
          .expect(200)
        })
      return result
    });

    it('/order/pay/:id (PUT)', async () => {
      const result = await request(app.getHttpServer())
        .post('/order')
        .send({
          "value": 112,
          "items":[
              {
                  "name": "hat",
                  "amount": 3,
                  "value": 12
              },
              {
                  "name":"boot",
                  "amount": 1,
                  "value": 100
              }
          ]
        })
        .expect(201).then((result) => {
          return request(app.getHttpServer())
          .put(`/order/pay/${result.body._id}`)
          .send({
              creditCard: "1101-2232-3133-4444",
              expirationDate: "12/22",
              verificationDigits: 741
          })
          .expect(200)
        })
        return result
    });
  })


  describe('payment should fail due to card rejection', () => {
    it('/order/pay/:id (PUT)', async () => {
      const result = await request(app.getHttpServer())
        .post('/order')
        .send({
          "value": 182,
          "items":[
              {
                  "name": "hat",
                  "amount": 3,
                  "value": 75
              },
              {
                  "name":"boot",
                  "amount": 1,
                  "value": 127
              }
          ]
        })
        .expect(201).then(async (result) => {
          const res = await request(app.getHttpServer())
          .put(`/order/pay/${result.body._id}`)
          .send({
              creditCard: "1111-2222-3333-4444",
              expirationDate: "12/22",
              verificationDigits: 741
          })
          .expect(400)
          return res
        })
        return result

    });

    it('/order/pay/:id (PUT)', async () => {
      const result = await request(app.getHttpServer())
        .post('/order')
        .send({
          "value": 112,
          "items":[
              {
                  "name": "hat",
                  "amount": 3,
                  "value": 12
              },
              {
                  "name":"boot",
                  "amount": 1,
                  "value": 100
              }
          ]
        })
        .expect(201).then(async (result) => {
          const res = await request(app.getHttpServer())
          .put(`/order/pay/${result.body._id}`)
          .send({
              creditCard: "2222-2222-3333-4444",
              expirationDate: "12/22",
              verificationDigits: 741
          })
          .expect(400)
          return res
        })
        return result

    });
  })
});
