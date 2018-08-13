import { PerformanceObserver, performance } from 'perf_hooks';
import chalk from 'chalk';

if (process.env.NODE_ENV !== 'production') {
  const obs = new PerformanceObserver((items) => {
    items.getEntries().forEach((item) => {
      console.log(chalk.cyan(`name: ${item.name} | duration: ${item.duration} ms`));
    });
    // obs.disconnect();
  });

  obs.observe({ entryTypes: ['function'] });
}

export function measure(key: string = '') {
  return function innerDecorator(target: Object, name: string, descriptor: PropertyDescriptor) {
    const wrapped = performance.timerify(descriptor.value);

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
