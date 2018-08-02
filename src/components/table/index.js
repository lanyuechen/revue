import React, { Component } from 'react';
import Table from './table';
import './style.scss';

export default class extends Component {
  constructor(props){
    super(props);
    this.table = new Table(props.th, props.td);
  }

  handleClick(node, type) {
    this.table.collapse(node, type);
    this.forceUpdate();
  }

  render() {
    const { leftHead, topHead, corner, body } = this.table;

    return (
      <div className="one-table">
        <table border="0" cellpadding="0" cellspacing="0">
          {topHead && topHead.map((tr, i) => (
            <tr key={i}>
              {i === 0 && corner.map((th, k) => (
                <th key={k} rowSpan={th.span}>
                  {th.collapseAble && (
                    <i className={`collapse${th.collapsed ? ' collapsed' : ''}`}
                       onClick={() => this.handleClick(th, 'all')}
                    />
                  )}
                  {th.key}
                </th>
              ))}
              {tr.map((th, j) => (
                <th key={j} colSpan={th.span}>
                  {th.collapseAble && (
                    <i className={`collapse${th.collapsed ? ' collapsed' : ''}`}
                       onClick={() => this.handleClick(th, 'y')}
                    />
                  )}
                  {th.key}
                </th>
              ))}
            </tr>
          ))}
          {body && body.map((tr, i) => (
            <tr>
              {leftHead[i] && leftHead[i].map((td, j) => (
                <td key={j} rowSpan={td.span} className="left-head">
                  {td.collapseAble && (
                    <i className={`collapse${td.collapsed ? ' collapsed' : ''}`}
                       onClick={() => this.handleClick(td, 'x')}
                    />
                  )}
                  {td.key}
                </td>
              ))}
              {tr.map((d, j) => (
                <td key={j}>{d.value}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}