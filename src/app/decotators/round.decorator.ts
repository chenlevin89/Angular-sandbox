export function roundDecorator(number: number) {
    return function innerFunction(target: Object, propertyName: string) {

        let _val;

        const setter = (value) => {
            _val = parseFloat(value).toFixed(number);
        };

        const getter = () => _val;

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
