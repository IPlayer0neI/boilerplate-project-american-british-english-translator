const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');
const noSpan = require("./1_unit-tests.js");

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test("Test Translation with text and locale fields", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({text: "Mangoes are my favorite fruit", locale: "american-to-british"})
      .end(function(err, res){
        let text = "Mangoes are my favourite fruit";
        let translation = noSpan(JSON.parse(res.text).translation);
        
        assert.equal(translation, text);
        done();
      });
  });

  test("Test Translation with text and invalid locale field", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({text: "Mangoes are my favorite fruit", locale: "americanbritish"})
      .end(function(err, res){
        let text = "Invalid value for locale field";
        let translation = JSON.parse(res.text).error;
        
        assert.equal(translation, text);
        done();
      });
  });

  test("Test Translation with missing text field", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({locale: "americanbritish"})
      .end(function(err, res){
        let text = "Required field(s) missing";
        let translation = JSON.parse(res.text).error;
        
        assert.equal(translation, text);
        done();
      });
  });
  
  test("Test Translation with missing locale field", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({text: "Mangoes are my favorite fruit"})
      .end(function(err, res){
        let text = "Required field(s) missing";
        let translation = JSON.parse(res.text).error;
        
        assert.equal(translation, text);
        done();
      });
  });

  test("Test Translation with empty text", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({text: "", locale: "american-to-british"})
      .end(function(err, res){
        let text = "No text to translate";
        let translation = JSON.parse(res.text).error;
        
        assert.equal(translation, text);
        done();
      });
   });

   test("Test Translation with text that needs no translation", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({text: "No translation", locale: "american-to-british"})
      .end(function(err, res){
        let text = "Everything looks good to me!";
        let translation = JSON.parse(res.text).translation;
        
        assert.equal(translation, text);
        done();
      });
   });
});
