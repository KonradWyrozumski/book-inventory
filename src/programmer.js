function Programmer() {
    this.countLanguagesKnown = [];
}

Programmer.prototype.learnNewLanguage = function(language) {
    this.countLanguagesKnown.push(language);
}

Programmer.prototype.isPragmatic = function() {
    return this.countLanguagesKnown.length >=3;
}

var programmer = new Programmer();
// programmer.learnNewLanguage('a');
// console.log(programmer.isPragmatic());
// programmer.learnNewLanguage('b');
// console.log(programmer.isPragmatic());
// programmer.learnNewLanguage('c');
// console.log(programmer.isPragmatic());

['a','b','c'].forEach(function(lang) {programmer.learnNewLanguage(lang)});
console.log(programmer.isPragmatic());


function createProgrammer() {
    var knownLanguages =[];
    var isPragmatic = function() {
            return knownLanguages.length >= 3;
    };

    var learnNewLanguage = function(lang) {
            knownLanguages.push(lang);
    };

    return {
        isPragmatic: isPragmatic,
        learnNewLanguage: learnNewLanguage
    }
}

var programmer = createProgrammer();

programmer.learnNewLanguage('a');
console.log(programmer.isPragmatic());
programmer.learnNewLanguage('a');
console.log(programmer.isPragmatic());
programmer.learnNewLanguage('a');
console.log(programmer.isPragmatic());