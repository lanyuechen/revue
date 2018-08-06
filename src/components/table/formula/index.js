import explain from './explain';
import parse, { cellIdx } from './funcs';

const SPEC = [
  { test: /^\w+$/, func: parse }
];

function calc(formula, data, offset) {
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

export default function (extra = [], table) {
  if (!table.body || !table.body.length) {
    return {};
  }

  const col = extra.filter(d => d.type === 'col').map(d => ([
    {key: d.name, span: table.topHeadDeep},
    ...table.body.map((b, i) => ({
      value: calc(d.formula, table.body, [i - table.topHeadDeep, -table.leftHeadDeep])
    }))
  ]));

  const body = table.body.map((d, i) => ([
    ...d,
    ...col.map(c => c[i + 1])
  ]));

  const row = extra.filter(d => d.type === 'row').map(d => ([
    {key: d.name, span: table.leftHeadDeep},
    ...body[0].map((b, i) => ({
      value: calc(d.formula, body, [-table.topHeadDeep, i - table.leftHeadDeep])
    }))
  ]));

  return { row, col };
}