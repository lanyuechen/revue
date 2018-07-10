import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.mountVue(this.refs.container, this.props.vue, this.props.data);
  }

  mountVue(element, Component, data) {
    const C = Vue.extend({
      template: `<Component />`,
      data: data,
      components: { Component }
    });

    new C().$mount(element);
  }

  render() {
    return (
      <div ref="container">

      </div>
    )
  }
}