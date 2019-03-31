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
      var typeRule = this.treeTypes.filter(t => t.type == type)[0];
      return typeRule;
    },
    contextSelected(command) {
      switch (command) {
        case "Create Basic":
          var node = {
            text: "New Basic Plan",
            type: "Basic",
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
