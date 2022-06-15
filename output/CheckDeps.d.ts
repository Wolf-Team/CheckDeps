declare type Dict<T = any> = {
    [key: string]: T;
};
declare function assignObject<S extends {}, T extends {}>(src: S, obj: T): S & T;
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
declare type DepsInfoDict = Dict<DepsInfo>;
interface LaunchScope {
    (scope: any): void;
}
interface Configuration {
    name: string;
    version: string;
    isClientOnly: boolean;
}
declare class CheckDeps {
    private scope;
    private requiredDeps;
    private countDeps;
    private initedDeps;
    private additiveDeps;
    private laucnhing;
    private configuration;
    constructor(cfg: Configuration);
    add(apiName: string): this;
    add(apiName: string, callback: DepsCallback): this;
    add(apiName: string, options: DepsOptions): this;
    launch(callback: LaunchScope): void;
}
