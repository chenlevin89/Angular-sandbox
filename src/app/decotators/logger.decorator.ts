export function logDecorator(target: Object, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args) {
        const result = method.apply(this, args);
        console.log(`Invoke function ${propertyName} with args ${args}, result ${result}`);
        return result;
    };

    return propertyDesciptor;
}
