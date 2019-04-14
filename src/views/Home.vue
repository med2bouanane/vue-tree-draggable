<template>
  <div class="container">
    <div class="row">
      <tree></tree>
    </div>
    <div class="row mt-5">
      <list :listSrc="list" :listDest="list2"></list>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Tree from "@/components/Tree";
import List from "@/components/List";
export default {
  created() {
    this.fetchTree();
    this.fetchList();
  },
  computed: {
    ...mapState("tree", ["tree"]),
    ...mapState("entitiesList", ["list", "list2"])
  },
  methods: {
    ...mapActions("tree", ["fetchTree"]),
    ...mapActions("entitiesList", ["fetchList"])
    },
  components: {
    Tree,
    List
  }
};
</script>
