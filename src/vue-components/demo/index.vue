<template>
  <div class="todo-list">
    <h2>{{title}}</h2>
    <ul>
      <li v-for="(d, idx) in list">
        {{d.name}} <a @click="remove(idx)" href="javascript:;">×</a>
      </li>
    </ul>
    <input v-model="input" type="text" placeholder="输入内容">
    <button @click="add">添加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vue todo list',
      list: [
        {name: 'something'},
        {name: 'other thing'}
      ]
    }
  },
  methods:{
    add: function() {
      if (!this.input) {
        return alert('请先输入内容');
      }
      this.list.push({name: this.input});
      this.input = '';
    },
    remove: function(idx) {
      this.list.splice(idx, 1);
    }
  }
}
</script>

<style scoped>
.todo-list {
  border: 1px solid #aaa;
  padding: 15px;
}
</style>