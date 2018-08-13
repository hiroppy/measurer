import { measure } from '../../lib';

test('should return function', () => {
  expect(typeof measure).toEqual('function');
});

test('should call @measure', () => {
  console.log = jest.fn();

  class T {
    @measure()
    run() {
      return 'finished';
    }
  }

  const t = new T();

  t.run();

  const str = console.log.mock.calls[0][0];

  expect(str.match(/name: run | duration: ([0-9,\.]+) ms/g)).toHaveLength(2);
});
