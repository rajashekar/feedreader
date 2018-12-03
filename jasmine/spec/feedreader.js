/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* Test suite for RSS Feeds */
    describe('RSS Feeds', function() {
        // test if allFeeds is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // test every feed has url defined and is not empty
        it('has feed url defined', function() {
            for(const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });

        // test if every feed has name and is not empty
        it('has feed name defined', function(){
            for(const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    /* Test suite for "The menu" */
    describe('The menu', function() {
        // test if menu is hidden by default
        it('has menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         // test menu visibility
         it('has menu visibility', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    /* Test suite for "Initial Entries" */
    describe('Initial Entries', function(){
        // wait for load feed to be done.
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            })
        });
        it('calls loadFeed and has single .entry', function(done){
            // check if we have atleast one entry
            expect($('.entry-link').length).not.toBeLessThan(1);
            done();
        });
    });

    /* Test suite for "New Feed Selection" */
    describe('New Feed Selection', function(){
        // by default 0th feed is loaded, so grab title
        let defaultTitle = allFeeds[0].name;
        beforeEach(function(done){
            // change the feed to second one
            loadFeed(1, function(){
                done();
            });
        });
        afterEach(function(done){
            // revert to first feed
            loadFeed(0, function(){
                done();
            })
        });
        it('changes content on new feed', function(done){
            // check if content got changed.
            expect($('.header-title').html()).not.toEqual(defaultTitle);
            done();
        });
    });
}());
