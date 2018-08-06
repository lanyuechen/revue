import React, { Component } from 'react';
import Table from './table';
import prepareFormula from './formula';

import './style.scss';

export default class extends Component {
  constructor(props){
    super(props);
    this.table = new Table(props.th, props.td);
  }

  handleToggle = (e, node, type) => {
    e.stopPropagation();
    this.table.collapse(node, type);
    this.forceUpdate();
  };

  handleScroll = () => {
    const { container, thead } = this.refs;
    let { scrollLeft, scrollTop } = container;

    thead.style.transform = `translateY(${scrollTop}px)`;

    container.querySelectorAll(`.left-head`).forEach(d => {
      d.style.transform = `translateX(${scrollLeft}px)`;
    });
  };

  handleClick = (e, node) => {
    this.props.onClick && this.props.onClick(e, node);
  };

  handleContextMenu = (e, node) => {
    e.preventDefault();
    this.props.onContextMenu && this.props.onContextMenu(e, node);
  };

  render() {
    const { extra } = this.props;
    const { leftHead, topHead, corner, body } = this.table;

    const { row, col } = prepareFormula(extra, this.table);

    return (
      <div className="one-table" ref="container" onScroll={this.handleScroll}>
        <table border="0" cellpadding="0" cellspacing="0">
          <tbody>
            {body && body.map((tr, i) => (
              <tr key={i}>
                {leftHead[i] && leftHead[i].map((td, j) => (
                  <td
                    key={j}
                    className="left-head"
                    rowSpan={td.span}
                    onClick={(e) => this.handleClick(e, td)}
                    onContextMenu={(e) => this.handleContextMenu(e, td)}
                  >
                    {td.collapseAble && (
                      <i className={`collapse${td.collapsed ? ' collapsed' : ''}`}
                         onClick={(e) => this.handleToggle(e, td, 'x')}
                      />
                    )}
                    {td.key}
                  </td>
                ))}
                {tr.map((d, j) => (
                  <td
                    key={j}
                    onClick={(e) => this.handleClick(e, d)}
                    onContextMenu={(e) => this.handleContextMenu(e, d)}
                  >
                    {d.value}
                  </td>
                ))}
                {col && col.map((td, j) => (
                  <td key={j}>{td[i + 1].value}</td>
                ))}
              </tr>
            ))}
            {row && row.map((tr, i) => (
              <tr key={i}>
                {tr.map((td, j) => (
                  <td key={j} colSpan={td.span} className={j === 0 ? 'left-head' : ''}>
                    {j === 0 ? td.key : td.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <thead ref="thead">
            {topHead && topHead.map((tr, i) => (
              <tr key={i}>
                {i === 0 && corner.map((th, k) => (
                  <th key={k} rowSpan={th.span} className="left-head">
                    {th.collapseAble && (
                      <i className={`collapse${th.collapsed ? ' collapsed' : ''}`}
                         onClick={(e) => this.handleToggle(e, th, 'all')}
                      />
                    )}
                    {th.key}
                  </th>
                ))}
                {tr.map((th, j) => (
                  <th
                    key={j}
                    colSpan={th.span}
                    onClick={(e) => this.handleClick(e, th)}
                    onContextMenu={(e) => this.handleContextMenu(e, th)}
                  >
                    {th.collapseAble && (
                      <i className={`collapse${th.collapsed ? ' collapsed' : ''}`}
                         onClick={(e) => this.handleToggle(e, th, 'y')}
                      />
                    )}
                    {th.key}
                  </th>
                ))}
                {i === 0 && col && col.map((th, j) => (
                  <th key={j} rowSpan={th[0].span}>
                    {th[0].key}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}