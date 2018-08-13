export function measure(key: string = '') {
  console.warn('Please delete this library from core codes.');

  return function innerDecorator(target: Object, name: string, descriptor: PropertyDescriptor) {
    return descriptor;
  };
}
