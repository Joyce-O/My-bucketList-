import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index'

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for Homepage and invalid url endpoints', () => {
  describe('Test for Homepage API Endpoint', () => {
    it('Should return status code 200 for success', done => {
      chai.request(app)
        .get('/api/v1')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.equal('Hi welcome to bucketlist, get started already!');
          done();
        });
    });
  });

  describe('Test for Invalid URL', () => {
    it('Should return status code 404 for failure', done => {
      chai.request(app)
        .get('/notexist')
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.equal('Oops! This page does not exist.');
          done();
        });
    });
  });
});