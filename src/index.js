import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import VC from './components/vue';

import VueTest from './vue-components/test/index.vue';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <VC vue={VueTest} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));