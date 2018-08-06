import React, { Component } from 'react';
import Table from './table';
import './style.scss';

import explain from './explain';
import parse, { cellIdx } from './parse'

const SPEC = [
  { test: /^\w+$/, func: parse }
];

export default class extends Component {
  constructor(props){
    super(props);
    this.table = new Table(props.th, props.td);
  }

  handleClick(node, type) {
    this.table.collapse(node, type);
    this.forceUpdate();
  }

  calc(formula, data, offset) {
    formula = formula.replace(/\s/g, '');
    formula = explain(formula, { spec: SPEC, data, offset });

    formula = formula.replace(/[a-z]+\d+/ig, (m) => {
      const c = cellIdx(m);
      const i = c[0] + offset[0];
      const j = c[1] + offset[1];
      if (data[i] && data[i][j]) {
        return data[i][j].value || 0;
      }
      return 0;
    });

    formula = eval(formula).toFixed(2);

    return formula * 1;
  }

  renderExtra(extra = [], table) {
    if (!table.body || !table.body.length) {
      return {};
    }

    const col = extra.filter(d => d.type === 'col').map(d => ([
      {key: d.name, span: table.topHeadDeep},
      ...table.body.map((b, i) => ({
        value: this.calc(d.formula, table.body, [i - table.topHeadDeep, -table.leftHeadDeep])
      }))
    ]));

    const body = table.body.map((d, i) => ([
      ...d,
      ...col.map(c => c[i + 1])
    ]));

    const row = extra.filter(d => d.type === 'row').map(d => ([
      {key: d.name, span: table.leftHeadDeep},
      ...body[0].map((b, i) => ({
        value: this.calc(d.formula, body, [-table.topHeadDeep, i - table.leftHeadDeep])
      }))
    ]));

    return { row, col };
  }

  render() {
    const { extra } = this.props;
    const { leftHead, topHead, corner, body } = this.table;

    console.log('---- extra ----', extra, this.table);

    const { row, col } = this.renderExtra(extra, this.table);


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
              {i === 0 && col && col.map((th, j) => (
                <th key={j} rowSpan={th[0].span}>
                  {th[0].key}
                </th>
              ))}
            </tr>
          ))}
          {body && body.map((tr, i) => (
            <tr key={i}>
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
        </table>
      </div>
    );
  }
}