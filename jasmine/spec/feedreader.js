/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
//Check for introduction>>> https://jasmine.github.io/2.1/introduction
$(function() {
    /* This suite is all about the RSS feeds definitions, 
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* test allFeeds variable has been defined and 
         * that it is not empty.
         */

        //define allFeeds.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */


        // use forEach for allFeeds object to define url is not empty.
        it('allFeeds of url are defined', function() {
            allFeeds.forEach(function(entry) {

                expect(entry.url).toBeTruthy();
                //expect(entry.url).toBeDefined();
                //expect(entry.url).not.toBeNull();
                //expect(entry.url.length).toBeGreaterThan(0);   

            });

        });

        /* Write a test that loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */

        // use forEach for allFeed object to define name is not empty.
        it('allFeeds of name are defined', function() {
            allFeeds.forEach(function(entry) {
                expect(entry.name).toBeTruthy();
                //expect(entry.name).toBeDefined();
                //expect(entry.name).not.toBeNull();
                //expect(entry.name.length).toBeGreaterThan(0);
            });
        });

    });

    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default.
         */
        var menuicon = $(".menu-icon-link");

        //In app.js find out feedList.on with click function and test it.
        it('test for hidden by defaut', function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        // test .menu-icon-link for menu hidden/display function
        it('test for feedList is hidden/display', function() {
            menuicon.click();
            expect($('body').hasClass("menu-hidden")).toBe(false);
            menuicon.click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //finished beforeEach before test asynchronous 
        beforeEach(function(done) {
            loadFeed(0, done);

        });

        //test $('.feed .entry')
        it('test entry element', function(done) {
            var entries = $('.feed .entry');
            expect(entries).toBeDefined();
            expect(entries.length).toBeGreaterThan(1);
            done();
        });


    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var changeFeed = $('.feed').html();
        var originalFeed = $('.feed').html();
        var randomFeed = Math.floor(Math.random() * 3) + 1;

        //async finished before the test.
        beforeAll(function(done) {
            loadFeed(0, function() {
                var originalFeed = $('.feed').html();
                done();
            });

            loadFeed(randomFeed);

        });

        //Tests that a new feed is loaded and the content changes.
        it('to change content and feeds', function(done) {
            loadFeed(0, function() {
                changeFeed = $('.feed').html();
                expect(originalFeed).not.toEqual(changeFeed);
                done();
            });

        });

    });


}());
