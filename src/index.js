import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import View from './components/vue';

import DemoReact from './components/demo';
import DemoVue from './vue-components/demo/index.vue';
import Table from './components/table';

import tData from './table.json';

const { th, td, extra } = tData;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DemoReact />
        <View vue={DemoVue} />
        <Table th={th} td={td} extra={extra} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));