describe('soundcloudPluginDesign: App', function () {
    beforeEach(module('soundcloudPluginDesign'));
        beforeEach(inject(
            function ($httpBackend) {
                $httpBackend.expectGET('/')
                    .respond(200);
            }));

        it('should load the home page on successful load of /', function () {
        });
});

/*
"use strict";

var httpProviderIt;

describe("Service Unit Tests", function() {

    beforeEach(function() {
        module('soundcloudPluginDesign', function ($httpProvider) {
            //save our interceptor
            httpProviderIt = $httpProvider;
        });
    });


    describe('RequestService Tests', function() {
        var interceptor = ['$q', function ($q) {
            var counter = 0;

            return {

                request: function (config) {
                    buildfire.spinner.show();
                    counter++;
                    return config;
                },
                response: function (response) {
                    counter--;
                    if (counter === 0) {

                        buildfire.spinner.hide();
                    }
                    return response;
                },
                responseError: function (rejection) {
                    counter--;
                    if (counter === 0) {

                        buildfire.spinner.hide();
                    }

                    return $q.reject(rejection);
                }
            };
        }];



        describe('HTTP tests', function () {

            it('should have the RequestService as an interceptor', function () {
                beforeEach(inject(
                function ($httpProvider) {
                        expect($httpProvider).toBeDefined();
                }));
            });

            it('should token in the headers after setting', function() {
                beforeEach(inject(
                    function ($httpBackend) {
                        $httpBackend.when('GET', 'http://example.com', null, function(headers) {
                            expect(headers).toBeDefined();
                        }).respond(200, {name: 'example' });
                    }));

            });

            it('should not place a token in the http request headers if no token is set', function() {
                var config = {headers: {} };
                expect(config.headers['Authorization']).toBe(undefined);
            });

            it('should place a token in the http request headers after a token is set', function() {
                var config = {headers: {} };
                expect(config.headers['Authorization']).toBe('');
            });
        }); //Mocked HTTP Requests

    }); //RequestService tests

});*/
