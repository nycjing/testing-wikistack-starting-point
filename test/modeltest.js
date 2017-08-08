var models = require('../models');
var Page = models.Page;
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var marked = require('marked');
chai.use(spies);

describe('Testing Page model', function (done) {

    beforeEach(function(){
        Page.sync({force:true})
            .then(done)
            .catch(done);
    });

    describe('First part: Virtuals', function () {
        var page;
        beforeEach(function(){
            page=Page.build({
                title: 'our page',
                urlTitle:'our_page',
                content:'# life is fun',
                status:"open",
                tags:['life','fun']
            })
        })
        describe('Virtal 1: route', function () {
            it('returns the url_name prepended by "/wiki/"',function(){
                var result = page.route;
                expect(result).to.equal("/wiki/our_page");
            });
        });
        describe('Virtal 2: renderedContent', function () {
            it('converts the markdown-formatted content into HTML',function(){
                var result = page.renderedContent;
                expect(result).to.equal(marked('# life is fun'));

            });
        });
    });

    describe('Class methods', function () {
        describe('findByTag', function () {
            it('gets pages with the search tag');
            it('does not get pages without the search tag');
        });
    });

    describe('Instance methods', function () {
        describe('findSimilar', function () {
            it('never gets itself');
            it('gets other pages with any common tags');
            it('does not get other pages without any common tags');
        });
    });

    describe('Validations', function () {
        it('errors without title');
        it('errors without content');
        it('errors given an invalid status');
    });

    describe('Hooks', function () {
        it('it sets urlTitle based on title before validating');
    });

});