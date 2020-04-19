interface ObjectString {
    [params: string]: string;
}
interface ObjectStrings {
    readonly [params: string]: string[];
}
declare type MethodsRule = 'startsWith' | 'endsWith' | 'includes';
interface Engine {
    get: Function;
    post: Function;
    put: Function;
    delete: Function;
    [params: string]: any;
}
interface Options {
    readonly methods?: ObjectStrings;
    mergeMethods?: ObjectStrings;
    config?: object;
    methodsRule?: MethodsRule;
    readonly rule?: string;
}
export default class BoxCat {
    server: ObjectString;
    engine: Engine;
    options: Options;
    sliceRegExp: RegExp;
    paramsRegExp: RegExp;
    constructor(server: ObjectString, engine: Engine, options?: Options);
    private createRegExp;
    private defaults;
    private apiFor;
    private createIng;
    private getMethod;
    private newFunction;
    private getParam;
}
export {};
