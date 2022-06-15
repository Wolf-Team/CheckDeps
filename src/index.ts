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


type Dict<T = any> = {
	[key: string]: T;
};

function assignObject<S extends {}, T extends {}>(src: S, obj: T): S & T {
	throw "";
}

interface DepsCallback {
	(api: any): any;
}
interface DepsFallback {
	(): any;
}
interface DepsOptions {
	required?: boolean;
	callback?: DepsCallback;
	fallback?: DepsFallback;
}

interface DepsInfo extends DepsOptions {
	loaded: boolean;
}
type DepsInfoDict = Dict<DepsInfo>;

interface LaunchScope {
	(scope: any): void;
}

interface Configuration {
	name: string,
	version: string,
	isClientOnly: boolean
}

class CheckDeps {
	private scope: Dict = {};
	private requiredDeps: DepsInfoDict = {};
	private countDeps = 0;
	private initedDeps = 0;

	private additiveDeps: DepsInfoDict = {};
	private laucnhing = false;
	private configuration: Configuration;

	constructor(cfg: Configuration) {
		if (!(this instanceof CheckDeps)) return new CheckDeps(cfg);

		this.configuration = cfg;
		ConfigureMultiplayer(this.configuration);
	}

	public add(apiName: string): this;
	public add(apiName: string, callback: DepsCallback): this;
	public add(apiName: string, options: DepsOptions): this;
	public add(apiName: string, options: DepsCallback | DepsOptions = (api) => api): this {
		if (this.laucnhing) {
			return this;
		}

		if (typeof options == "function")
			options = { callback: options };

		if (options.callback === undefined) options.callback = (api) => api;

		if (options.required === undefined || options.required === true) {
			this.countDeps++;
			this.requiredDeps[apiName] = { loaded: false, callback: options.callback };
		} else {
			this.additiveDeps[apiName] = { loaded: false, callback: options.callback, fallback: options.fallback }
		}

		return this;
	}

	public launch(callback: LaunchScope): void {
		if (this.laucnhing) return;
		this.laucnhing = true;

		for (const depsName in this.requiredDeps) {
			const deps = this.requiredDeps[depsName];
			ModAPI.addAPICallback(depsName, (api: any) => {
				this.scope[depsName] = deps.callback(api);
				deps.loaded = true;

				this.initedDeps++;
			});
		}

		for (const depsName in this.requiredDeps) {
			const deps = this.requiredDeps[depsName];
			ModAPI.addAPICallback(depsName, (api: any) => {
				this.scope[depsName] = deps.callback(api);
				deps.loaded = true;

				this.initedDeps++;
			});
		}

		for (const depsName in this.additiveDeps) {
			const deps = this.additiveDeps[depsName];
			ModAPI.addAPICallback(depsName, (api: any) => {
				this.scope[depsName] = deps.callback(api);
				deps.loaded = true;
			});
		}

		Callback.addCallback("ModsLoaded", () => {
			if (this.initedDeps == this.countDeps) {
				for (const depsName in this.additiveDeps) {
					const deps = this.additiveDeps[depsName];
					if (!deps.loaded && deps.fallback) {
						this.scope[depsName] = deps.fallback();
					}
				}
				callback(this.scope)
			}
		});
	}
}



EXPORT("CheckDeps", CheckDeps);
