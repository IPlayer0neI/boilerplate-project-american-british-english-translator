const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();
let regexSpan = /(?:<span class=\"highlight\">)(.+?)(?:<\/span>)/ig;

function noSpan(str){ 
  return str.replace(regexSpan, "$1");
};

suite('Unit Tests', () => {
  suite("Translate test", function(){
    test("text: Mangoes are my favorite fruit", function(){
      let text = "Mangoes are my favourite fruit";
      let translation = noSpan(translator.translate("Mangoes are my favorite fruit", "american-to-british"));

      assert.equal(translation, text);
    });

    test("text: I ate yogurt for breakfast", function(){
      let text = "I ate yoghurt for breakfast";
      let translation = noSpan(translator.translate("I ate yogurt for breakfast", "american-to-british"));

      assert.equal(translation, text);
    });

    test("text: We had a party at my friend's condo", function(){
        let text = "We had a party at my friend's flat";
        let translation = noSpan(translator.translate("We had a party at my friend's condo", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: Can you toss this in the trashcan for me?", function(){
        let text = "Can you toss this in the bin for me?";
        let translation = noSpan(translator.translate("Can you toss this in the trashcan for me?", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: The parking lot was full", function(){
        let text = "The car park was full";
        let translation = noSpan(translator.translate("The parking lot was full", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: Like a high tech Rube Goldberg machine", function(){
        let text = "Like a high tech Heath Robinson device";
        let translation = noSpan(translator.translate("Like a high tech Rube Goldberg machine", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: To play hooky means to skip class or work", function(){
        let text = "To bunk off means to skip class or work";
        let translation = noSpan(translator.translate("To play hooky means to skip class or work", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: No Mr. Bond, I expect you to die", function(){
        let text = "No Mr Bond, I expect you to die";
        let translation = noSpan(translator.translate("No Mr. Bond, I expect you to die", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: Dr. Grosh will see you now", function(){
        let text = "Dr Grosh will see you now";
        let translation = noSpan(translator.translate("Dr. Grosh will see you now", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: Lunch is at 12:15 today", function(){
        let text = "Lunch is at 12.15 today";
        let translation = noSpan(translator.translate("Lunch is at 12:15 today", "american-to-british"));

        assert.equal(translation, text);
    });

    test("text: We watched the footie match for a whiley", function(){
        let text = "We watched the soccer match for a while";
        let translation = noSpan(translator.translate("We watched the footie match for a while", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: Paracetamol takes up to an hour to work", function(){
        let text = "Tylenol takes up to an hour to work";
        let translation = noSpan(translator.translate("Paracetamol takes up to an hour to work", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: First, caramelise the onions", function(){
        let text = "First, caramelize the onions";
        let translation = noSpan(translator.translate("First, caramelise the onions", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: I spent the bank holiday at the funfair", function(){
        let text = "I spent the public holiday at the carnival";
        let translation = noSpan(translator.translate("I spent the bank holiday at the funfair", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: I had a bicky then went to the chippyr", function(){
        let text = "I had a cookie then went to the fish-and-chip shop";
        let translation = noSpan(translator.translate("I had a bicky then went to the chippy", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: I've just got bits and bobs in my bum bag", function(){
        let text = "I've just got odds and ends in my fanny pack";
        let translation = noSpan(translator.translate("I've just got bits and bobs in my bum bag", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: The car boot sale at Boxted Airfield was called off", function(){
        let text = "The swap meet at Boxted Airfield was called off";
        let translation = noSpan(translator.translate("The car boot sale at Boxted Airfield was called off", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: Have you met Mrs Kalyani?", function(){
        let text = "Have you met Mrs. Kalyani?";
        let translation = noSpan(translator.translate("Have you met Mrs Kalyani?", "british-to-american"));
        
        assert.equal(translation, text);
    });

    test("text: Prof Joyner of King's College, London", function(){
        let text = "Prof. Joyner of King's College, London";
        let translation = noSpan(translator.translate("Prof Joyner of King's College, London", "british-to-american"));

        assert.equal(translation, text);
    });

    test("text: Tea time is usually around 4 or 4.30", function(){
        let text = "Tea time is usually around 4 or 4:30";
        let translation = noSpan(translator.translate("Tea time is usually around 4 or 4.30", "british-to-american"));

        assert.equal(translation, text);
    });
   });
   
  suite("Highlight translation test", function(){
    test("Highlight translation in Mangoes are my favorite fruit", function(){
        let highlight = translator.translate("Mangoes are my favorite fruit", "american-to-british").match(regexSpan);

        assert.isOk(highlight[0]);
    });

    test("Highlight translation in I ate yogurt for breakfast", function(){
        let highlight = translator.translate("I ate yogurt for breakfast", "american-to-british").match(regexSpan);
         
        assert.isOk(highlight[0]);
    });

    test("Highlight translation in We watched the footie match for a while", function(){    
        let highlight = translator.translate("We watched the footie match for a while", "british-to-american").match(regexSpan);

        assert.isOk(highlight[0]);
    });

    test("Highlight translation in Paracetamol takes up to an hour to work", function(){
        let highlight = translator.translate("Paracetamol takes up to an hour to work", "british-to-american").match(regexSpan);
        
        assert.isOk(highlight[0]);
    });
  });
});

module.exports = noSpan;