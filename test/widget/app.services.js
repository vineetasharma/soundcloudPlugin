describe('Unit : soundCloudWidgetServices content services', function () {
    describe('Unit : soundCloudAPI Factory', function () {
        var $http, $q,soundCloudAPI;
        beforeEach(module('soundCloudWidgetServices'));
        beforeEach(inject(function (_soundCloudAPI_,_$http_, _$q_) {
            $http = _$http_;
            $q = _$q_;
            soundCloudAPI = _soundCloudAPI_;
        }));
        describe('Units should be defined', function () {
            it('soundCloudAPI should exist and be an object', function () {
                expect(typeof soundCloudAPI).toEqual('object');
            });

        });
    });


});