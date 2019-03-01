<template>
  <section class="container" > <!--最外层容器-->
    <section class="menu"> <!--左边的容器 里面加上组件 menus-->
     <menus></menus> <!-- * -->
    </section>
     <section class="content-container"><!--右边的容器-->
     <todo></todo>
    </section>
   </section>
</template>
<script>
import menus from './menus' // * 导入刚才我们创建的 menus组件
import todo from './todo'
export default {
  components: { // * 注册menus组件，让其可以在template调用
    menus,
    todo // 新加的
  }
}
</script>
<style lang="less">
@import '../common/style/layouts.less';
</style>
