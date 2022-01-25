LIBRARY({
	name: "CheckDeps",
	version: 1,
	api: "CoreEngine",
	shared: false
});

class CheckDeps {
	private scope: { [key: string]: any } = {};
	private deps: { [key: string]: boolean } = {};
	private countDeps = 0;
	private initedDeps = 0;

	public add(apiName: string, callback: (api: any) => any = (api) => api) {
		this.countDeps++;
		this.deps[apiName] = false;

		ModAPI.addAPICallback(apiName, (api: any) => {
			this.scope[apiName] = callback(api);
			this.deps[apiName] = true;
			this.initedDeps++;

			if (this.initedDeps == this.countDeps) {
				Launch(this.scope);
			}
		});

		return this;
	}
}

EXPORT("CheckDeps", CheckDeps);
