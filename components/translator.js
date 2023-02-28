const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  translate(text, conversion){
    let result = text;
    let only;
    let title;
    if(conversion == "american-to-british"){
      only = americanOnly;
      title = americanToBritishTitles;
    }else if(conversion == "british-to-american"){
      only = britishOnly;
      title = Object.fromEntries(Object.entries(americanToBritishTitles).map(a => a.reverse()));
    };
    let dictonary = Object.assign(americanToBritishSpelling, title, only);
    let consult = Object.keys(dictonary);
    
    consult.forEach(function(element){
      let regex = new RegExp("\\b" + element.replace(".",  "\\.") + "\\b", "ig");
      let regexTime = /(\d+)\:(\d+)/ig;
      if(element == "dr\.") console.log(element ,regex, text)
      if(regex.test(text)) result = result.replace(regex, dictonary[element]);
      if(regexTime.test(text)) result = result.replace(regexTime, "<span class=\"highlight\">$1.$2</span>");
    });

    return result
  }
}

module.exports = Translator;