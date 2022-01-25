LIBRARY({
    name: "CheckDeps",
    version: 1,
    api: "CoreEngine",
    shared: false
});
var CheckDeps = /** @class */ (function () {
    function CheckDeps() {
        this.scope = {};
        this.deps = {};
        this.countDeps = 0;
        this.initedDeps = 0;
    }
    CheckDeps.prototype.add = function (apiName, callback) {
        var _this = this;
        if (callback === void 0) { callback = function (api) { return api; }; }
        this.countDeps++;
        this.deps[apiName] = false;
        ModAPI.addAPICallback(apiName, function (api) {
            _this.scope[apiName] = callback(api);
            _this.deps[apiName] = true;
            _this.initedDeps++;
            if (_this.initedDeps == _this.countDeps) {
                Launch(_this.scope);
            }
        });
        return this;
    };
    return CheckDeps;
}());
EXPORT("CheckDeps", CheckDeps);
