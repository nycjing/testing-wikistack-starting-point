var expect = require('chai').expect;

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

    // it('sums a negative and a positive', function () {
    //     var result = negNum + posNum;
    //     expect(result).to.equal(50);
    // });
    // it('is commutative', function () {
    //     var resultA = negNum + posNum,
    //         resultB = posNum + negNum;
    //     expect(resultA).to.equal(resultB);
    // });
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
