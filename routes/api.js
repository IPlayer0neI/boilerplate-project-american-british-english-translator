'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
       let {text, locale} = req.body;
       let translation = translator.translate(text, locale);
       res.json({text, translation});
    });
};
