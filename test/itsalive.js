var expect = require('chai').expect;
describe('+', function () {
    var posNum, negNum;
    beforeEach(function () {
        posNum = 2;
        negNum = -2;
    });
    it('sums two positive numbers', function () {
        var result = posNum + posNum;
        expect(result).to.equal(4);
    });
    // it('sums two negative number', function () {
    //     var result = negNum + negNum;
    //     expect(result).to.equal(-100);
    // });
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
