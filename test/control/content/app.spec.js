describe('soundCloudPluginContent: App', function () {
    beforeEach(module('soundCloudPluginContent'));
    var $httpProvider;
    beforeEach(inject(
        function ($httpBackend) {
            $httpBackend.expectGET('/')
                .respond(200);
        }));

    it('should load the home page on successful load of /', function () {
    });
});
