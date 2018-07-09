import React, { Component } from 'react';

import './style.scss';

export default class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="demo-react">
        React: Hello world!!!
      </div>
    )
  }
}