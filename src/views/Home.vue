<template>
  <div class="container">
    <div class="row">
      <tree></tree>
    </div>
    <div class="row mt-5">
      <list></list>
    </div>
  </div>
</template>


<script>
import Tree from "@/components/Tree";
import List from "@/components/List";
export default {
  components: {
    Tree,
    List
  }
};
</script>
