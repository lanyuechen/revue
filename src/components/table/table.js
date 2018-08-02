/**
 * Table
 * 接入数据(初始数据)：th, td
 * 基础数据(表格的折叠展开等操作)：th, td, leftTree, topTree
 * 返回数据(渲染图表数据)：leftHead, topHead, corner, body
 */
export default class Table {
  /**
   * 将度量(type=v)转换为维度项(type=y),将td中数据进行拆分，并将值存在value下
   */
  static metricToDimension(th, td) {
    const thv = th.filter(h => h.type === 'v');
    if (thv.length === 0) {
      return [ th, td ];
    }

    const _th = [...th], _td = [], body = {};
    thv.map(h => {
      const key = `k${parseInt(Math.random() * 1000000)}`;
      const idx = th.findIndex(d => d.type === 'y');
      _th.splice(idx, 0, {
        key,
        type: 'y',
        name: '度量'
      });
      td.map(d => {
        _td.push({
          ...d,
          [key]: h.name,
          value: d[h.key]
        });
      });
    });
    return [ _th, _td ];
  }

  /**
   * 遍历树
   */
  static map(tree, cb, i = 0) {
    cb(tree, i);
    if (tree.children) {
      tree.children.map((d, i) => {
        Table.map(d, cb, i);
      });
    }
  }

  static find(tree, cb) {
    let node;
    Table.map({children: tree}, (n) => {
      if (cb(n)) {
        node = n;
      }
    });
    return node;
  }

  /**
   * 排序，为下一步分组拆分并转换为树结构做准备
   */
  static sort(th, td) {
    if (!th.length) {
      return td;
    }
    return [...td].sort((a, b) => {
      for (let i = 0; i < th.length; i++) {
        if (th[i].type === 'x' || th[i].type === 'y') {
          const idx0 = td.findIndex(d => d[i] === a[i]);
          const idx1 = td.findIndex(d => d[i] === b[i]);
          if (idx0 !== idx1) {
            return idx0 - idx1;
          }
        }
      }
    });
  }

  static toTree(th, td, parent, level = 0) {
    const [ h, ..._th ] = th;
    if (!h) {
      return null;
    }

    return td.reduce((p, n) => {
      const f = p.find(d => d.key === n[h.key]);

      if (f) {
        f.children && f.children.push(n);
      } else {
        p.push({
          key: n[h.key],
          parent,
          level,
          children: [n]
        });
      }
      return p;
    }, []).map(d => {
      d.collapsed = h.collapsed && h.collapsed.indexOf(d.key) > -1;
      if (d.collapsed) {
        d.children = Table.collapsedChildren(d, _th.length);
      } else {
        d.children = d.children && Table.toTree(_th, d.children, d, level + 1);
      }
      return d;
    });
  }

  static collapsedChildren(node, deep) {
    const child = {
      key: '',
      parent: node,
      level: node.level + 1
    }
    if (deep - 1 > 0) {
      child.children = Table.collapsedChildren(child, deep - 1)
    }
    return [ child ];
  }

  static setSpan(tree) {
    tree.span = tree.children && tree.children.reduce((p, n) => {
        if (n.children && n.children.length) {
          return p + Table.setSpan(n);
        }
        return p + 1;
      }, 0);
    return tree.span;
  }

  static chain(node) {
    if (node.children && node.children.length) {
      return [node, ...Table.chain(node.children[0])]
    } else {
      return [node];
    }
  }

  static toLeftHead(tree) {
    if (!tree || !tree.length) {
      return [];
    }
    const tHead = [ Table.chain(tree[0]) ];
    Table.map({children: tree}, (d, i) => {
      if (i > 0) {
        tHead.push(Table.chain(d));
      }
    });
    return tHead;
  }

  static toTopHead(tree) {
    const tHead = [];
    Table.map({children: tree, level: -1}, (node) => {
      if (node.level > -1) {
        if (tHead[node.level]) {
          tHead[node.level].push(node);
        } else {
          tHead[node.level] = [node];
        }
      }
    });
    return tHead;
  }

  static getCorner(th) {
    const x = th.filter(d => d.type === 'x');
    const span = th.filter(d => d.type === 'y').length;
    return x.map(d => ({
      key: d.name,
      span
    }));
  }

  static getBody(hTree, vTree, th, td) {
    const leftLevel = th.filter(d => d.type === 'x').length;
    const topLevel = th.filter(d => d.type === 'y').length;

    const dMap = td.reduce((p, n) => {
      let kx = '', ky = '';
      for (let d of th.filter(d => d.type === 'x')) {
        kx += n[d.key];
        if (d.collapsed && d.collapsed.indexOf(n[d.key]) > -1) {
          break;
        }
      }

      for (let d of th.filter(d => d.type === 'y')) {
        ky += n[d.key];
        if (d.collapsed && d.collapsed.indexOf(n[d.key]) > -1) {
          break;
        }
      }

      p[kx + ky] = (p[kx + ky] || 0) + n.value;
      return p;
    }, {});

    const body = [];
    Table.map({children: hTree}, (n1) => {
      if (!n1.children || !n1.children.length) {
        let td = [];
        Table.map({children: vTree}, (n2) => {
          if (!n2.children || !n2.children.length) {
            const key = Table.getKey(n1) + Table.getKey(n2);
            td.push({ value: dMap[key] });
          }
        });
        body.push(td);
      }
    });
    return body;
  }

  static getKey(node) {
    if (!node) {
      return '';
    }
    return Table.getKey(node.parent) + (node.key || '');
  }

  constructor(th = [], td = []) {
    this.init(th, td);
    this.update();
  }

  init(th, td) {
    [ th, td ] = Table.metricToDimension(th, td);
    this.td = Table.sort(th, td);
    this.th = th;

    this.leftTree = Table.toTree(th.filter(d => d.type === 'x'), td) || [];
    this.leftTree.map(Table.setSpan);

    this.topTree = Table.toTree(th.filter(d => d.type === 'y'), td) || [];
    this.topTree.map(Table.setSpan);
  }

  update() {
    this.leftHead = Table.toLeftHead(this.leftTree, this.td);
    this.topHead = Table.toTopHead(this.topTree);
    this.corner = Table.getCorner(this.th);
    this.body = Table.getBody(this.leftTree, this.topTree, this.th, this.td);
    console.log('table', this)
  }

  collapse(node) {
    const n = Table.find(this.leftTree, (n) => n.level === node.level && n.key === node.key);
    n.collapsed = true;
    this.update();
  }

}