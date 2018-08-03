/**
 * Table
 */
export default class Table {
  static metricToDimension(th, td) {
    const thv = th.filter(h => h.type === 'v');
    if (thv.length === 0) {
      return [ th, td ];
    }

    const _th = [...th], _td = [];
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

  static map(tree, cb, i = 0) {
    cb(tree, i);
    if (tree.children) {
      tree.children.map((d, i) => {
        Table.map(d, cb, i);
      });
    }
  }

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
      d.collapseAble = h.collapseAble;
      d.collapsed = h.collapsed && h.collapsed.indexOf(d.key) > -1;
      if (!_th.length) {
        d.children = undefined;
      } else if (d.collapsed) {
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

  static getLeftHead(tree) {
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

  static getTopHead(tree) {
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

  static getCorner(th, td, span) {
    return th.map((h, i) => ({
      key: h.name,
      span,
      level: i,
      collapseAble: h.collapseAble,
      collapsed: h.collapsed && !td.find(d => h.collapsed.indexOf(d[h.key]) === -1)
    }));
  }

  static getBody(hTree, vTree, th, td) {
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

  static collapsedAll(th, td) {
    const idx = th.findIndex(h => h.collapsed && !td.find(d => h.collapsed.indexOf(d[h.key]) === -1));
    if (idx > -1) {
      return th.filter((h, i) => i <= idx).map(h => ({...h, collapseAble: true}));
    }
    return th.map((h, i) => ({
      ...h,
      collapseAble: i < th.length - 1
    }));
  }

  constructor(th, td) {
    this.data(th, td);
    this.update(this.th, this.td);
  }

  data(th = [], td = []) {
    [ th, td ] = Table.metricToDimension(th, td);
    this.td = Table.sort(th, td);
    this.th = th;
    return this;
  }

  update(th, td) {
    const thx = Table.collapsedAll(th.filter(d => d.type === 'x'), td);
    const leftTree = Table.toTree(thx, td) || [];
    leftTree.map(Table.setSpan);

    const thy = Table.collapsedAll(th.filter(d => d.type === 'y'), td);
    const topTree = Table.toTree(thy, td) || [];
    topTree.map(Table.setSpan);

    this.leftHead = Table.getLeftHead(leftTree, td);
    this.topHead = Table.getTopHead(topTree);
    this.corner = Table.getCorner(thx, td, thy.length);
    this.body = Table.getBody(leftTree, topTree, [...thx, ...thy], td);
  }

  collapse(node, type) {
    if (type === 'all') {
      this.th.filter(h => h.type === 'x').map((h, i) => {
        if (node.level === i) {
          if (node.collapsed) {
            h.collapsed = [];
          } else {
            h.collapsed = this.td.reduce((p, n) => {
              if (p.indexOf(n[h.key]) === -1) {
                p.push(n[h.key]);
              }
              return p;
            }, []);
          }
        }
      });
    } else {
      this.th.filter(d => d.type === type).map((d, i) => {
        if (node.level === i) {
          if (d.collapsed) {
            const idx = d.collapsed.findIndex(c => c === node.key);
            if (idx > -1) {
              d.collapsed.splice(idx, 1);
            } else {
              d.collapsed.push(node.key);
            }
          } else {
            d.collapsed = [node.key];
          }
        }
      });
    }

    this.update(this.th, this.td);
  }

}