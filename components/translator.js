const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  translate(text, locale){
    const startUpperCase = string => string[0].toUpperCase() + string.substring(1);
    let result = text;
    let only;
    let title;
    if(locale == "american-to-british"){
      only = americanOnly;
      title = Object.fromEntries(Object.entries(americanToBritishTitles).map(a => [a[0], startUpperCase(a[1])]));
    }else if(locale == "british-to-american"){
      only = britishOnly;
      title = Object.fromEntries(Object.entries(americanToBritishTitles).map(a => [a[1], startUpperCase(a[0])]));
    };
    let dictonary = Object.assign(americanToBritishSpelling, title, only);
    let consult = Object.keys(dictonary);
    
    consult.forEach(function(element){
      let regex = new RegExp("(?<=^|\\W|\\b)" + element.replace(".",  "\\.") + "(?=$|\\W|\\b)", "ig");
      let regexTime = /(\d+)\:(\d+)/ig;

      if(regex.test(text)) result = result.replace(regex, "<span class=\"highlight\">" + dictonary[element] + "</span>");
      if(regexTime.test(text)) result = result.replace(regexTime, "<span class=\"highlight\">$1.$2</span>");
    });

    return result
  }
}

module.exports = Translator;