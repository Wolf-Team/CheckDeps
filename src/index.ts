LIBRARY({
	name: "CheckDeps",
	version: 1,
	api: "CoreEngine",
	shared: false
});

class CheckDeps {
	private scope: { [key: string]: any } = {};
	private deps: {
		[key: string]: {
			loaded: boolean;
			callback: (api: any) => any;
		}
	} = {};
	private countDeps = 0;
	private initedDeps = 0;

	public add(apiName: string, callback: (api: any) => any = (api) => api) {
		this.countDeps++;
		this.deps[apiName] = { callback, loaded: false };
		return this;
	}

	public launch(callback: (scope: any) => void) {
		for (const depsName in this.deps) {
			const deps = this.deps[depsName];
			ModAPI.addAPICallback(depsName, (api: any) => {
				this.scope[depsName] = deps.callback(api);
				deps.loaded = true;
				this.initedDeps++;

				if (this.initedDeps == this.countDeps)
					callback(this.scope)
			})
		}
	}
}

EXPORT("CheckDeps", CheckDeps);
