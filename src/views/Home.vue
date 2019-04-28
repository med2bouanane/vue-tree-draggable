<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <tree></tree>
      </div>
      <div class="col-md-9">
        <list :listSrc="list" :listDest="list2"></list>
      </div>
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
