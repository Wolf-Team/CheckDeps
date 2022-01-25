declare class CheckDeps {
    private scope;
    private deps;
    private countDeps;
    private initedDeps;
    add(apiName: string, callback?: (api: any) => any): this;
}
