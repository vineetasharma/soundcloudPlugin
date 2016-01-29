describe('soundCloudPluginContent: App', function () {
    beforeEach(module('soundCloudPluginContent'));
    beforeEach(inject(
        function ($httpBackend) {
            $httpBackend.expectGET('/')
                .respond(200);
        }));

    it('should load the home page on successful load of /', function () {
    });
});
