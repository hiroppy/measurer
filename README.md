# Measurer

Simple performance helper for the Browser and Node.js.

## Feature

- Measures the execution time of a method
- Supports decorators
- Uses `timerify` in Node.js, `performance.measure` in Browser

## Install

```sh
$ npm i measurer
```

## Usage

```js
import { measure } from 'measurer';

class Robot {
  @measure() // just add it here
  calc() {
    const len = 64 * 1024 * 1024;
    const b = Buffer.allocUnsafe(len);
    let s = '';

    for (let i = 0; i < 256; ++i) s += String.fromCharCode(i);
    for (let i = 0; i < 64 * 1024 * 1024; i += 256) b.write(s, i, 256, 'ascii');
    for (let i = 0; i < 32; ++i) b.toString('base64');
  }
}

const robot = new Robot();

roboot.calc(); // output: name: calc | duration: 3.047741ms
```

### Measure Component's render

You can see [samples](/samples).

#### Common Component

It is possible to write to common components because both Browser and Node.js are supported.

```js
import * as React from 'react';
import { measure } from 'measurer';

export class Component extends React.Component {
  @measure()
  render() {
    return <ul>{[...new Array(100000)].map((_, i) => <li key={i}>{i}</li>)}</ul>;
  }
}
```

#### Client

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from './Component';

ReactDOM.render(<Component />, document.getElementById('root'));
// output: name: render | duration: 353.09999994933605 ms
```

#### Server

```js
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Component } from './Component';

renderToString(<Component />);
// output: name: render | duration: 358.03561 ms
```
