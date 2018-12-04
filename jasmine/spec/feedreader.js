/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

(function () {
  /* Test suite for RSS Feeds */
  describe('RSS Feeds', () => {
    // test if allFeeds is defined
    it('are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // test every feed has url defined and is not empty
    it('has feed url defined', () => {
      allFeeds.forEach(feed => {
        expect(feed.url).toBeDefined();
        expect(feed.url).toBeTruthy();
      });
    });

    // test if every feed has name and is not empty
    it('has feed name defined', () => {
      allFeeds.forEach(feed => {
        expect(feed.name).toBeDefined();
        expect(feed.name).toBeTruthy();
      });
    });
  });


  /* Test suite for "The menu" */
  describe('The menu', () => {
    // test if menu is hidden by default
    it('has menu hidden by default', () => {
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });

    // test menu visibility
    it('has menu visibility', () => {
      $('.menu-icon-link').trigger('click');
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      $('.menu-icon-link').trigger('click');
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /* Test suite for "Initial Entries" */
  describe('Initial Entries', () => {
    // wait for load feed to be done.
    beforeEach(done => {
      loadFeed(0, () => {
        done();
      })
    });
    it('calls loadFeed and has single .entry', done => {
      // check if we have atleast one entry in feed container
      expect($('.feed .entry-link').length).not.toBeLessThan(1);
      done();
    });
  });

  /* Test suite for "New Feed Selection" */
  describe('New Feed Selection', () => {
    // by default 0th feed is loaded, so grab title
    let firstLoadFeed, secondLoadFeed;
    beforeEach(done => {
      // load first feed
      loadFeed(0, () => {
        // get the first feed content
        firstLoadFeed = $('.feed').html();
        // load second feed
        loadFeed(1, () => {
          // get the second feed content
          secondLoadFeed = $('.feed').html();
          done();
        });
      });
    });
    afterEach(done => {
      // revert to first feed
      loadFeed(0, () => {
        done();
      })
    });
    it('changes content on new feed', done => {
      // check if content got changed.
      expect(firstLoadFeed).not.toEqual(secondLoadFeed);
      done();
    });
  });
}());