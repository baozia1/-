<template>
  <div class="list-todos">  <!--菜单容器-->
      <a @click="goList(item.id)" class="list-todo activeListClass list" :class="{'active': item.id === todoId}" v-for="item in items"> <!--单个菜单容器-->
        <span class="icon-lock" v-if="item.locked"></span>  <!--锁的图标-->
        <span class="count-list" v-if="item.count"> 0">{{item.count}}</span><!--数字-->
        {{item.title}}
      </a>
    <a class=" link-list-new" @click="addTodoList"> <!--新增菜单-->
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
import { getTodoList, addTodo } from '../api/api'
export default {
  data () {
    return {
      items: [], // 菜单数据
      todoId: ''
    }
  },
  created () {
    getTodoList({}).then(res => {
      const TODOS = res.data.todos // 返回的数据都会在res.data里面。
      this.items = TODOS // 把菜单数据赋值给定义的items
      this.todoId = TODOS[0].id // 把菜单数据默认的第一个对象的id赋值给默认选中的id
    })
  },
  methods: {
    goList (id) { // 点击菜单时，替换选中的id
      this.todoId = id
    },
    addTodoList () {
      addTodo({}).then(data => {
        getTodoList({}).then(res => {
          const TODOS = res.data.todos
          this.items = TODOS
          this.todoId = TODOS[TODOS.length - 1].id
        })
      })
    }
  },
  watch: {
    'todoId' (id) {
      this.$router.push({name: 'todo', params: {id: id}})
    }
  }
}
</script>
<style lang="less">
  @import '../common/style/menu.less';
</style>
