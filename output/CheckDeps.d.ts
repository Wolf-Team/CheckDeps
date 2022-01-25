declare class CheckDeps {
    private scope;
    private deps;
    private countDeps;
    private initedDeps;
    private laucnhing;
    add(apiName: string, callback?: (api: any) => any): this;
    launch(callback: (scope: any) => void): void;
}
