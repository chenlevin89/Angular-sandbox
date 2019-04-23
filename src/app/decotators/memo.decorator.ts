export function memoDecorator(target: Object, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value;
    const dict = {};

    propertyDesciptor.value = function (...args) {
        const key = args.toString();
        if (!dict[key]) {
            dict[key] = method.apply(this, args);
        }
        return dict[key];
    };

    return propertyDesciptor;
}
