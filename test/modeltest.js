var models = require('../models');
var Page = require('../models').Page;
var db = require('../models').db;
var User = models.User;
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var marked = require('marked');
var Promise = require('bluebird');
chai.use(spies);

describe('Testing Page model', function (done) {

    before('Sync and reset whole db', () => {
        return db.sync({force: true})
    });

    beforeEach('Sync and reset the pages table', () => {
        return Page.sync({force: true})
    })

    describe('First part: Virtuals', function () {
        var page;
        beforeEach(function () {
        page = Page.build({
            title: 'our page',
            urlTitle: 'our_page',
            content: '# life is fun',
            status: "open",
            tags: ['life', 'fun']
        });
    });
    describe('Virtal 1: route', function () {
        it('returns the url_name prepended by "/wiki/"', function () {
            var result = page.route;
            expect(result).to.equal("/wiki/our_page");
        });
    });
    describe('Virtal 2: renderedContent', function () {
        it('converts the markdown-formatted content into HTML', function () {
            var result = page.renderedContent;
            expect(result).to.equal(marked('# life is fun'));

        });
    });
    });

    describe('Class methods', function () {

        const pageData = [
            {title: 'Sunrise', content: 'I never see this', tags: ['sun']},
            {title: 'Daytime', content: 'Busy', tags: ['indoors']},
            {title: 'Sunset', content: 'Beautiful', tags: ['sun']},
        ];

        beforeEach('put pages into db', () => {
            return Promise.all(pageData.map(pageDatum => {
              return Page.create(pageDatum)
            }))
            // return Page.bulkCreate(pageData) // I like this —GLL
        })

        describe('findByTag', function () {

            it('gets pages with the search tag', function () {
                return  Page.findByTag('sun')

                    .then(function (page) {
                        console.log('what is pages ID',page[0].id );
                        expect(page).to.have.lengthOf(2);
                    })
            });
            it('does not get pages without the search tag', function () {
                return  Page.findByTag('bar')
                    .then(function (page) {
                        expect(page).to.have.lengthOf(0);
                    })
            });

    });

    });

    describe('Instance methods', function () {


        describe('findSimilar', function () {

            const pageData = [
                {title: 'Sunrise', content: 'I never see this', tags: ['goo']},
                {title: 'Daytime', content: 'Busy', tags: ['indoors','goo']},
                {title: 'Sunset', content: 'Beautiful', tags: ['sun','goo']},
            ];
            var page;
            beforeEach('put pages into db', () => {
                return Promise.all(pageData.map(pageDatum => {
                    return Page.create(pageDatum)
                }))
        .then(pages=>{
               return page = pages[0];


        })

        })

            it('never gets itself', function () {

                return page.findSimilar()
                    .then(pages=>{
                    console.log('what is pages ID',pages.id,'wahts is pages ID',page.id );
                    expect(pages).to.not.have.property('id', page.id)

            })
            });

            it('gets other pages with any common tags', function () {
                return page.findSimilar()
                    .then(pages=>{
                    console.log('what is pages tags',pages.tags,'wahts is pages tags',page.tags );
                    var result = pages.tags;
                console.log('------',result);
                expect(pages.tags).to.have.members(page.tags);
            })
            });

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
