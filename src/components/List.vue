<template>
  <div class="fluid container">
    <!-- <div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Sortable control</h3>
      </div>
      <div class="panel-body">
        <div class="checkbox">
          <label><input type="checkbox" v-model="editable">Enable drag and drop</label>
        </div>
        <button type="button" class="btn btn-default" @click="orderList">Sort by original order</button>
      </div>
    </div>-->
    <div class="row">
      <div class="col-md-6">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card-header text-white bg-primary">
            <b>List-1</b>
          </div>
          <div class="card-body">
            <draggable
              class="list-group overflow "
              tag="ul"
              :value="list"
              v-bind="dragOptions"
              :move="onMove"
              @start="isDragging=true"
              @end="isDragging=false"
            >
              <transition-group type="transition" :name="'flip-list'">
                <li
                  class="list-group-item shadow-lg p-3 bg-white rounded"
                  v-for="element in list"
                  :key="element.order"
                >
                  <i
                    :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                    @click=" element.fixed=! element.fixed"
                    aria-hidden="true"
                  ></i>
                  {{element.name}}
                  <span
                    class="badge badge-secondary"
                  >{{element.order}}</span>
                </li>
              </transition-group>
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
            <draggable element="span" :value="list2" v-bind="dragOptions" :move="onMove">
              <transition-group name="no" class="list-group" tag="ul">
                <li
                  class="list-group-item shadow-lg p-3 bg-white rounded"
                  v-for="element in list2"
                  :key="element.order"
                >
                  <i
                    :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                    @click=" element.fixed=! element.fixed"
                    aria-hidden="true"
                  ></i>
                  {{element.name}}
                  <span class="badge">{{element.order}}</span>
                </li>
              </transition-group>
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
  data() {
    return {
      // list:[],
      // list: message.map((name, index) => {
      //   return { name, order: index + 1, fixed: false };
      // }),
      // list2: [{name:"dadffa",fixed:false, order:5}],
      // list:[],
      // list2:[],
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