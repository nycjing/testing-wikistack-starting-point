var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

function done(){
    return console.log('Done' + err);
};

describe('+', function () {
    var posNum, negNum;
    beforeEach(function () {
        posNum = 2;
        negNum = -2;
    });

    it('sums two positive numbers,confirms basic arithmetic', function () {
        var result = posNum + posNum;
        expect(result).to.equal(4);
    });

});

describe('setTimeout function', function () {


    it('should show about 1 s', function (done) {
        var current = new Date();
        setTimeout(function () {
            result = new Date() - current;
            console.log(result);
            expect(result).to.be.closeTo(1000, 50);
            done();
        }, 1000);


    });
});


describe ('spy', function (){
    it ('envoke a function on each element', function(){
       var arr = ['x','y','z'];
        function logNth (val, idx) {
        console.log('Logging elem #'+idx+':', val);
    }
     logNth = chai.spy(logNth);
     arr.forEach(logNth);
     expect(logNth).to.have.been.called.exactly(arr.length);
    });
 });


 describe ('testing max function', function(){
    Math.max = function (a, b) {
        if (a > b) return a;
    else return b;
    };

    it('returns the larger of two numbers', function () {
    var larger = Math.max(6,5);
    expect(larger).to.equal(6);
    });

 })
