import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import View from './components/vue';

import DemoReact from './components/demo';
import DemoVue from './vue-components/demo/index.vue';
import Table from './components/table';

const th = [
  {"key": "k7c0ht4", "type": "x", "name": "区域", "collapsed": [

  ]},
  {"key": "k310yqf", "type": "x", "name": "省份", "collapsed": [
    "黑龙江"
  ]},
  {"key": "k11ftww", "type": "x", "name": "城市"},
  {"key": "k58avo8", "type": "y", "name": "产品类别", "collapsed": [

  ]},
  {"key": "kdoyivs", "type": "y", "name": "产品子类别"},
  {"key": "kvi1pj5", "type": "v", "name": "单价（总和）"},
];

const td = [
  {"k11ftww":"牡丹江","k310yqf":"黑龙江","k58avo8":"家具产品","k7c0ht4":"东北","kdoyivs":"椅子","kvi1pj5":26.79},
  {"k11ftww":"黑河","k310yqf":"黑龙江","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"橡皮筋","kvi1pj5":3.74},
  {"k11ftww":"大连","k310yqf":"辽宁","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"橡皮筋","kvi1pj5":1.48},
  {"k11ftww":"本溪","k310yqf":"辽宁","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"纸张","kvi1pj5":59.14},
  {"k11ftww":"本溪","k310yqf":"辽宁","k58avo8":"家具产品","k7c0ht4":"东北","kdoyivs":"椅子","kvi1pj5":481.95},
  {"k11ftww":"葫芦岛","k310yqf":"辽宁","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"纸张","kvi1pj5":23.1},
  {"k11ftww":"葫芦岛","k310yqf":"辽宁","k58avo8":"家具产品","k7c0ht4":"东北","kdoyivs":"椅子","kvi1pj5":314.96},
  {"k11ftww":"黑河","k310yqf":"黑龙江","k58avo8":"家具产品","k7c0ht4":"东北","kdoyivs":"桌子","kvi1pj5":349.45},
  {"k11ftww":"保定","k310yqf":"河北","k58avo8":"办公用品","k7c0ht4":"华北","kdoyivs":"纸张","kvi1pj5":57.43},
  {"k11ftww":"保定","k310yqf":"河北","k58avo8":"家具产品","k7c0ht4":"华北","kdoyivs":"桌子","kvi1pj5":270.54},
  {"k11ftww":"石家庄","k310yqf":"河北","k58avo8":"办公用品","k7c0ht4":"华北","kdoyivs":"纸张","kvi1pj5":94.85},
  {"k11ftww":"石家庄","k310yqf":"河北","k58avo8":"家具产品","k7c0ht4":"华北","kdoyivs":"椅子","kvi1pj5":567.91},
  {"k11ftww":"大连","k310yqf":"辽宁","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"纸张","kvi1pj5":4.98},
  {"k11ftww":"大连","k310yqf":"辽宁","k58avo8":"家具产品","k7c0ht4":"东北","kdoyivs":"桌子","kvi1pj5":1122.31},
  {"k11ftww":"大连","k310yqf":"辽宁","k58avo8":"家具产品","k7c0ht4":"东北","kdoyivs":"椅子","kvi1pj5":89.99},
  {"k11ftww":"本溪","k310yqf":"辽宁","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"橡皮筋","kvi1pj5":1.14},
  {"k11ftww":"本溪","k310yqf":"辽宁","k58avo8":"家具产品","k7c0ht4":"东北","kdoyivs":"桌子","kvi1pj5":329.08},
  {"k11ftww":"牡丹江","k310yqf":"黑龙江","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"纸张","kvi1pj5":17.19},
  {"k11ftww":"黑河","k310yqf":"黑龙江","k58avo8":"办公用品","k7c0ht4":"东北","kdoyivs":"纸张","kvi1pj5":33.73}
];

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DemoReact />
        <View vue={DemoVue} />
        <Table th={th} td={td} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));