export function measure(key: string = '') {
  return function innerDecorator(target: Object, name: string, descriptor: PropertyDescriptor) {
    const wrap = (fn: Function) => {
      const wrappedFunction = (...args: Array<any>) => {
        const start = Math.random().toString();
        const end = Math.random().toString();
        const label = Math.random().toString();

        window.performance.mark(start);

        const re = fn(...args);

        window.performance.mark(end);
        window.performance.measure(label, start, end);

        const results = window.performance.getEntriesByName(label);

        results.forEach((item: any) => {
          console.log(`name: ${name} | duration: ${item.duration} ms`);
        });

        window.performance.clearMarks(start);
        window.performance.clearMarks(end);
        window.performance.clearMeasures(label);

        return re;
      };

      return wrappedFunction;
    };

    const wrapped = wrap(descriptor.value);

    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Reflect.defineProperty(this, name, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: wrapped
        });

        return this[name];
      }
    };
  };
}
