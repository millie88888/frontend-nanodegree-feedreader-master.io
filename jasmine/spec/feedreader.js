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
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        //define allFeeds.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        // use forEach for allFeeds object to define url is not empty.
        it('allFeeds of url are defined', function() {
            allFeeds.forEach(function(entry) {

                expect(entry.url).toBeDefined();
                expect(entry.url).not.toBeNull();
                expect(entry.url.length).toBeGreaterThan(1);

            });

        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        // use forEach for allFeed object to define name is not empty.
        it('allFeeds of name are defined', function() {
            allFeeds.forEach(function(entry) {

                expect(entry.name).toBeDefined();
                expect(entry.name).not.toBeNull();
                expect(entry.name.length).toBeGreaterThan(1);
            });
        });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var menuicon = $(".menu-icon-link");

        //In app.js find out feedList.on with click function and test it.
        it('test for hidden by defaut', function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        // test .menu-icon-link for menu hidden/display function
        it('test for feedList is hidden/display', function() {
            menuicon.click();
            expect($('body').hasClass("menu-hidden")).not.toBe(true);
            menuicon.click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
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

        var changeFeed;
        var feed = $('.feed');
        var feedChoise = Math.floor(Math.random() * 3) + 1;

        //async finished before the test.
        beforeEach(function(done) {

            loadFeed(0, function() {
                changeFeed = feed.html();
                loadFeed(feedChoise, done);
            });
        });

        afterEach(function() {
            changeFeed = 0;
        });

        //Tests that a new feed is loaded and the content changes.
        it('to change content and feeds', function() {
            loadFeed(0, function() {
                expect(feed.html()).not.toEqual(changeFeed);
                done();
            });
            expect(feed.html()).not.toBe(changeFeed);
        }, 2000);

    });


}());
