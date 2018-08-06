const CHAR_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const funcs = {
  sum: (...values) => values.reduce((p, n) => p + n, 0),
  max: (...values) => Math.max(...values),
  min: (...values) => Math.min(...values),
  average: (...values) => values.reduce((p, n) => p + n, 0) / values.length,
  count: (...values) => values.length
};

export function toCode(num) {
  if (!parseInt(num) && parseInt(num) != 0) {
    return num;
  }
  let res = '';
  while(num >= 0) {
    let i = num % 26;
    res = CHAR_TABLE[i] + res;
    num = Math.floor(num / 26) - 1;
  }
  return res;
}

export function toNum(code) {
  code = code.toUpperCase();
  let total = 0;
  for (let i in code) {
    let idx = CHAR_TABLE.indexOf(code[i]);
    if (i < code.length - 1) {
      idx += 1;
    }
    total += idx * Math.pow(26, code.length - i - 1);
  }
  return total;
}

export default function({ func, params, props }) {
  const { data, offset } = props;
  let values = [];
  params.map(d => {
    const m = d.match(/^(\w+):(\w+)$/i);
    if (m) {    //范围计算
      const start = cellIdx(m[1]);
      const end = cellIdx(m[2]);
      for (let i = start[0] + offset[0]; i <= end[0] + offset[0]; i++) {
        for (let j = start[1] + offset[1]; j <= end[1] + offset[1]; j++) {
          if (data[i] && data[i][j]) {
            values.push(data[i][j].value || 0);
          }
        }
      }
    } else {    //单元格,直接转换为数值
      const c = cellIdx(d);
      const i = c[0] + offset[0];
      const j = c[1] + offset[1];
      if (data[i] && data[i][j]) {
        values.push(data[i][j].value || 0);
      }
    }
  });
  return funcs[func](...values);
}

export function cellIdx(cell) {
  const m = cell.match(/^([a-z]+)(\d+)$/i);
  return [ m[2] - 1, toNum(m[1]) ];
}