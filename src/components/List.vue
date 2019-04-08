<template>
  <div class="fluid container">
    <div class="row">
      <div class="col-md-6">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card-header text-white bg-primary">
            <b>List-1</b>
          </div>
          <div class="card-body">
            <draggable
              class="list-group"
              :list="listSrc" group="my-group" @change="log">
                <div class="list-group-item shadow-lg p-3 bg-white rounded"
                  v-for="element in list"
                  :key="element.id">
                  {{element.name}}
                  <span class="badge">{{element.order}}</span>
                  </div>
                  
                  
            </draggable>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card-header text-white bg-primary">
            <b>List-2</b>
          </div>
          <div class="card-body">
            <draggable class="list-group" :list="listDest" group="my-group" @change="log">
                <div
                  class="list-group-item shadow-lg p-3 bg-white rounded"
                  v-for="element in list2"
                  :key="element.id"
                >
                  {{element.name}}
                  <span class="badge">{{element.order}}</span>
                </div>
            </draggable>
          </div>
        </div>
      </div>

      <!-- <div class="list-group col-md-3">
      <pre>{{listString}}</pre>
    </div>
    <div class="list-group col-md-3">
      <pre>{{list2String}}</pre>
      </div>-->
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapActions, mapState } from "vuex";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];
export default {
  name: "hello",
  components: {
    draggable
  },
  props:{
    listSrc:{
      type: Array,
      required: true
    },
    listDest:{
      type: Array,
      required: true
    }    
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  mounted() {
    // this.fetchList();//.then((res)=>this.list = res);
  },
  methods: {
    // ...mapActions("entitiesList", ["fetchList"]),
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    log: function(evt) {
      window.console.log(evt);
    }
  },
  computed: {
    ...mapState("entitiesList", ["list", "list2"]),
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  margin-bottom: 10px !important;
  border-left: 5px solid #66BB6A !important;
  /**/
}
.list-group-item:hover {
  opacity: 0.7;
  background-color: #FAFAFA !important; 
}
.list-group-item i {
  cursor: pointer;
}
</style>