import * as React from 'react';
import { measure } from '../lib';

export class Component extends React.Component {
  @measure()
  render() {
    return (
      <ul>
        {[...new Array(100000)].map((_, i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    );
  }
}
