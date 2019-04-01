<template>
<div>
  <v-treeview
    v-model="tree.treeData"
    :treeTypes="tree.treeTypes"
    @selected="selected"
    :openAll="tree.openAll"
    :contextItems="tree.contextItems"
    @contextSelected="contextSelected"
  ></v-treeview>
  <button type="button" @click="contextSelected">ADD</button>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import VTreeview from "v-treeview";
export default {
//   data() {
//     return {
//       tree: null
//     };
//   },
  mounted() {
    this.fetchTree();
  },
  computed: {
        ...mapState('tree', ['tree'])
      },
  methods: {
    ...mapActions("tree", ["fetchTree"]),
    getTypeRule(type) {
      var typeRule = this.tree.treeTypes.filter(t => t.type == type)[0];
      return typeRule;
    },
    contextSelected(command) {
        var node = {
            text: "New Batch",
            type: "BATCH",
            children: []
          };
        this.tree.treeData[0].children.push(node);
      switch (command) {
        case "Create Basic":
          var node = {
            text: "New Basic Plan",
            type: "Basic",
            count: 0,
            children: []
          };
          this.selectedNode.addNode(node);
          break;
        case "Create Top-up":
          var node = {
            text: "New Top-up",
            type: "Top-up",
            children: []
          };
          this.selectedNode.addNode(node);
          break;
        case "Rename":
          this.selectedNode.editName();
          break;
        case "Remove":
          break;
      }
    },
    selected(node) {
      this.selectedNode = node;
    //   this.selectedNode.icon = "fas fa-folder-open"
      this.contextItems = [];
      var typeRule = this.getTypeRule(this.selectedNode.model.type);
      typeRule.valid_children.map(function(type, key) {
        var childType = this.getTypeRule(type);
        var item = {
          title: "Create " + type,
          icon: childType.icon,
          type: childType
        };
        this.contextItems.push(item);
      }, this);

      this.contextItems.push({ title: "Rename", icon: "far fa-edit" });
      this.contextItems.push({ title: "Remove", icon: "far fa-trash-alt" });
    }
  },
  components: {
    VTreeview
  }
};
</script>

<style>
ul .tree-node input[type=radio]+label:before{
    background: transparent !important;
}
svg{
    width: 50px !important;
    height: 25px !important;
}
</style>

