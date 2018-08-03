## Table

### 输入
> 表头描述对象数组（th）

| 属性 | 类型 | 描述 | 是否必须 | 默认值 |
| --- | --- | --- | --- | --- |
| key | string | td对象中数据对应的key | 是 | - |
| type | string | 数据类型，x：左表头，y：上表头，v：数值 | 是 | - |
| name | string | 表头名称 | 是 | - |
| collapsed | array | 表头折叠标志 | 否 | null |

```
th = [
  {"key": "k7c0ht4", "type": "x", "name": "区域", "collapsed": []},
  {"key": "k310yqf", "type": "x", "name": "省份", "collapsed": ["黑龙江"]},
  {"key": "k11ftww", "type": "x", "name": "城市"},
  {"key": "k58avo8", "type": "y", "name": "产品类别", "collapsed": []},
  {"key": "kdoyivs", "type": "y", "name": "产品子类别"},
  {"key": "kvi1pj5", "type": "v", "name": "单价（总和）"},
];
```

> 数据描述对象（td）

| 属性 | 类型 | 描述 | 是否必须 | 默认值 |
| --- | --- | --- | --- | --- |
| [td.key] | string | th对象中数据对应的key值 | 是 | - |

```

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

```