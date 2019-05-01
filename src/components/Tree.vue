<template>
  <div class="card shadow-lg p-3 bg-white rounded">
    <div class="card-body">
      <button class="button">Add new Item</button>
      <v-treeview id="tr"
        v-model="treeComponent.treeData"
        :treeTypes="treeComponent.treeTypes"
        :openAll="true"
        :contextItems="treeComponent.contextItems"
        @contextSelected="contextSelected"
        @openTree="openTree"
        @clickIcon="rowClick"
      ></v-treeview>
    </div>
    <button class="button">Add new Item</button>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import VTreeview from "v-treeview";
export default {
  data() {
    return {
      open: false
    };
  },
  mounted() {
    document.querySelectorAll('.button').forEach(element => {
        element.addEventListener('mouseover',function() {
            alert("button");

         });
    })
    // this.fetchTree();
    // this.fetchList();
    console.log('this',this.$el.querySelectorAll(".tree-node .toggle-icon"));
    console.log('this',document.querySelector(".toggle-icon"));
    console.log('button',this.$el.querySelectorAll(".button"));
    console.log('button',document.querySelector(".button"));
    // this.rowClick();
    document.querySelectorAll('.tree-node .toggle-icon').forEach(element => {
      // console.log('ele',element);
      // element.addEventListener('click', (e) => this.$emit('clickIcon', e));
      element.addEventListener('mouseover',function() {
            alert("toggle-icon");

         });
    });
  },
  computed: {
    ...mapState("tree", ["tree", "treeComponent"]),
    ...mapState("entitiesList", ["list", "list2"])
  },
  methods: {
    ...mapActions("tree", ["fetchTree"]),
    ...mapActions("entitiesList", ["fetchList", "updateLists"]),
    ...mapMutations("entitiesList", ["setList"]),
    rowClick(){
      console.log('dlsajdlasf*****');
      // const icon = this.$el.querySelector(".toggle-icon");
      // console.log('dlsajdlasf',icon);
      // icon.addEventListener('click',function(){console.log('evt*******');});
    },
    openTree(node) {
      console.log("--------------------", node);
      this.open = false;
    },
    getTypeRule(type) {
      var typeRule = this.treeComponent.treeTypes.filter(
        t => t.type == type
      )[0];
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
      let obj = {};
      // node.open = true;
      console.log("--------------------NODE", node);
      this.selectedNode = node;
      //   this.selectedNode.icon = "fas fa-folder-open"
      this.contextItems = [];
      var typeRule = this.getTypeRule(this.selectedNode.model.type);
      console.log("ROOT===>", typeRule.type);
      if (typeRule.type === "ROOT") {
        obj = { id: node.$vnode.data.key, type: "BATCH" };
        this.updateLists(obj);
      } else if (typeRule.type === "BATCH") {
        obj = { id: node.$vnode.data.key, type: "ENV" };
        this.updateLists(obj);
      } else if (typeRule.type === "ENV") {
        obj = { id: node.$vnode.data.key, type: "DOC" };
        this.updateLists(obj);
      }

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
ul .tree-node input[type="radio"] + label:before {
  background: transparent !important;
}
/* svg {
  width: 50px !important;
  height: 25px !important;
} */

.tree-icon {
  width: 50px !important;
  height: 25px !important;
}

/* .toggle-icon {
  display: none !important;
} */
</style>

