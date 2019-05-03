
export function log(
    target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>
): TypedPropertyDescriptor<any> | void {
    if (undefined === descriptor) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    const orig = descriptor.value;
    descriptor.value = function () {
        console.log(`<log> ${key.toString()}`);
        return orig.apply(this, arguments);
    };
    return descriptor;
}

export function logt(tag: string) {
    return (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        if (undefined === descriptor) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const orig = descriptor.value;
        descriptor.value = function () {
            console.log(`<log> [${tag}] ${key.toString()}`);
            return orig.apply(this, arguments);
        };
        return descriptor;
    };
}
