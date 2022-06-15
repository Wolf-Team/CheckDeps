/*

░█▀▀█ █──█ █▀▀ █▀▀ █─█ ░█▀▀▄ █▀▀ █▀▀█ █▀▀
░█─── █▀▀█ █▀▀ █── █▀▄ ░█─░█ █▀▀ █──█ ▀▀█
░█▄▄█ ▀──▀ ▀▀▀ ▀▀▀ ▀─▀ ░█▄▄▀ ▀▀▀ █▀▀▀ ▀▀▀
                                                                
    CheckDeps 1.0 ©WolfTeam ( https://vk.com/wolf___team )
    GitHub: https://github.com/Wolf-Team/CheckDeps
*/
LIBRARY({
    name: "CheckDeps",
    version: 1,
    api: "CoreEngine",
    shared: false
});
function assignObject(src, obj) {
    throw "";
}
var CheckDeps = /** @class */ (function () {
    function CheckDeps(cfg) {
        this.scope = {};
        this.requiredDeps = {};
        this.countDeps = 0;
        this.initedDeps = 0;
        this.additiveDeps = {};
        this.laucnhing = false;
        if (!(this instanceof CheckDeps))
            return new CheckDeps(cfg);
        this.configuration = cfg;
        ConfigureMultiplayer(this.configuration);
    }
    CheckDeps.prototype.add = function (apiName, options) {
        if (options === void 0) { options = function (api) { return api; }; }
        if (this.laucnhing) {
            return this;
        }
        if (typeof options == "function")
            options = { callback: options };
        if (options.callback === undefined)
            options.callback = function (api) { return api; };
        if (options.required === undefined || options.required === true) {
            this.countDeps++;
            this.requiredDeps[apiName] = { loaded: false, callback: options.callback };
        }
        else {
            this.additiveDeps[apiName] = { loaded: false, callback: options.callback, fallback: options.fallback };
        }
        return this;
    };
    CheckDeps.prototype.launch = function (callback) {
        var _this = this;
        if (this.laucnhing)
            return;
        this.laucnhing = true;
        var _loop_1 = function (depsName) {
            var deps = this_1.requiredDeps[depsName];
            ModAPI.addAPICallback(depsName, function (api) {
                _this.scope[depsName] = deps.callback(api);
                deps.loaded = true;
                _this.initedDeps++;
            });
        };
        var this_1 = this;
        for (var depsName in this.requiredDeps) {
            _loop_1(depsName);
        }
        var _loop_2 = function (depsName) {
            var deps = this_2.requiredDeps[depsName];
            ModAPI.addAPICallback(depsName, function (api) {
                _this.scope[depsName] = deps.callback(api);
                deps.loaded = true;
                _this.initedDeps++;
            });
        };
        var this_2 = this;
        for (var depsName in this.requiredDeps) {
            _loop_2(depsName);
        }
        var _loop_3 = function (depsName) {
            var deps = this_3.additiveDeps[depsName];
            ModAPI.addAPICallback(depsName, function (api) {
                _this.scope[depsName] = deps.callback(api);
                deps.loaded = true;
            });
        };
        var this_3 = this;
        for (var depsName in this.additiveDeps) {
            _loop_3(depsName);
        }
        Callback.addCallback("ModsLoaded", function () {
            if (_this.initedDeps == _this.countDeps) {
                for (var depsName in _this.additiveDeps) {
                    var deps = _this.additiveDeps[depsName];
                    if (!deps.loaded && deps.fallback) {
                        _this.scope[depsName] = deps.fallback();
                    }
                }
                callback(_this.scope);
            }
        });
    };
    return CheckDeps;
}());
EXPORT("CheckDeps", CheckDeps);
