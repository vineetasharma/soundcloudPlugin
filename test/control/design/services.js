describe('Unit : SoundCloudDesignServices services', function () {
    beforeEach(module('SoundCloudDesignServices'));
    var Buildfire;


    describe('Unit : Buildfire service', function () {

        beforeEach(inject(
            function (_buildfire_) {
                Buildfire = _buildfire_;
            }));
    });

    describe('Unit : DataStore Factory', function () {
        var DataStore, Buildfire, STATUS_MESSAGES, STATUS_CODE;
        beforeEach(module('SoundCloudDesignServices'));
        Buildfire = {
            datastore: {}
        };
        Buildfire.datastore = jasmine.createSpyObj('Buildfire.datastore', ['get', 'save']);
        beforeEach(inject(function (_DataStore_, _STATUS_CODE_, _STATUS_MESSAGES_) {
            DataStore = _DataStore_;
            STATUS_CODE = _STATUS_CODE_;
            STATUS_MESSAGES = _STATUS_MESSAGES_;
        }));
    });
    beforeEach(inject(function () {
        Buildfire = {
            datastore: {}
        };
        Buildfire.datastore = jasmine.createSpyObj('Buildfire.datastore', ['get', 'save']);
    }));
    describe('Unit : SoundCloud service', function () {
        var DB, SoundCloud, Buildfire, $rootScope, Location;
        beforeEach(inject(
            function (_DB_, _$rootScope_, _Buildfire_) {
                DB = _DB_;
                Buildfire = _Buildfire_;
                SoundCloud = new DB('SoundCloud');
                $rootScope = _$rootScope_;
            }));
        beforeEach(inject(function () {
            Buildfire = {
                datastore: {}
            };
            Buildfire.datastore = jasmine.createSpyObj('Buildfire.datastore', ['get', 'update', 'save']);
        }));

        it('SoundCloud should exists', function () {
            expect(SoundCloud).toBeDefined();
            expect(SoundCloud._tagName).toEqual('SoundCloud');
        });
        it('SoundCloud methods should exists', function () {
            expect(SoundCloud.get).toBeDefined();
            expect(SoundCloud.save).toBeDefined();
        });
        it('SoundCloud.get methods should call Buildfire.datastore.get', function () {
            Buildfire.datastore.get.and.callFake(function (tagName, cb) {
                cb(null, {});
            });
            SoundCloud.get();
        });
        it('SoundCloud.get methods should call Buildfire.datastore.get Error Case', function () {
            Buildfire.datastore.get.and.callFake(function (tagName, cb) {
                cb({code: 'No result found'}, null);
            });
            SoundCloud.get();
        });
        describe('save method:', function () {
            it('SoundCloud.save methods should call Buildfire.datastore.save', function () {
                Buildfire.datastore.save.and.callFake(function (tagName, cb) {
                    cb(null, {});
                });
                SoundCloud.save({});
                SoundCloud.save();
            });
            it('SoundCloud.save methods should call Buildfire.datastore.save Error case', function () {
                Buildfire.datastore.save.and.callFake(function (tagName, cb) {
                    cb({}, null);
                });
                SoundCloud.save({});
                SoundCloud.save();
            });
        });

    });
});