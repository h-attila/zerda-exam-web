'use strict';

var test = require('tape');
var validator = require('./validator.js')

test("validator accepts valid email, a scale of 15 and positive feedback", function (t) {
  t.equal(validator.emailOk('@'), true);
  t.equal(validator.scaleOk(15), true);
  t.equal(validator.feedbackOk('amazing awesome blithesome'), true);
  t.end();
});


test("validator rejects unfilled email, a scale of 15 and positive feedback", function (t) {
  t.notEqual(validator.emailOk(''), true);
  t.equal(validator.scaleOk(15), true);
  t.equal(validator.feedbackOk('amazing awesome blithesome'), true);
  t.end();
});


test("validator rejects valid email, a scale of 9 and positive feedback", function (t) {
  t.equal(validator.emailOk('@'), true);
  t.notEqual(validator.scaleOk(9), true);
  t.equal(validator.feedbackOk('amazing awesome blithesome'), true);
  t.end();
});


test("validator rejects valid email, a scale of text and positive feedback", function (t) {
  t.equal(validator.emailOk('@'), true);
  t.notEqual(validator.scaleOk('text here is not good idea...'), true);
  t.equal(validator.feedbackOk('amazing awesome blithesome'), true);
  t.end();
});


test("validator rejects unfilled email, a unfilled scale and positive feedback", function (t) {
  t.notEqual(validator.emailOk(''), true);
  t.notEqual(validator.scaleOk(''), true);
  t.equal(validator.feedbackOk('amazing awesome blithesome'), true);
  t.end();
});


test("validator rejects invalid email, a scale of (-1) and negative feedback", function (t) {
  t.notEqual(validator.emailOk(''), true);
  t.notEqual(validator.scaleOk(-1), true);
  t.notEqual(validator.feedbackOk('this school is terrible'), true);
  t.end();
});
