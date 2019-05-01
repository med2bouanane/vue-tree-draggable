<template>
  <div class="card shadow-lg p-3 bg-white rounded" id="myid">
    <div class="card-header text-white bg-primary">
      <b>Corbeille Classification</b>
    </div>
    <div class="card-body">
      <div class="fluid container">
    <!-- <transition name="fade" > -->
    <transition name="slide-fade">
    <!-- <transition name="bounce">   -->
        <div class="card" v-if="showWF">
          <div class="card-body bg-gradient-warning">
            <div class="row">
              <div class="col-md-6">
                <label>wf:</label>
                <Workflow :options="['Vue.js','React']" @input="setSelected"></Workflow>
              </div>
              <transition name="slide-fade" >
              <div class="col-md-6" v-if="showList">
                <label>tray:</label>
                <Workflow :options="['Vue.js-2','React-2']"></Workflow>
              </div>
              </transition>
            </div>
          </div>
        </div>
        </transition>
      </div>
        <div class="row">
          <div class="col-md-6 overflow-auto" style="max-height:500px;">
            <div class="card shadow-lg p-3 bg-white rounded">
              <div class="card-header text-white bg-primary">
                <b>List-1</b>
              </div>
              <div class="card-body">
                <draggable
                  class="list-group"
                  :list="listSrc"
                  group="my-group"
                  @change="log"
                  @end="updateTree"
                  @click="show"
                >
                  <div
                    class="list-group-item shadow-lg p-3 bg-white rounded"
                    v-for="element in list"
                    :key="element.id"
                  >
                    {{element.label}}
                    <span class="badge">{{element.order}}</span>
                  </div>
                </draggable>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card shadow-lg p-3 bg-white rounded">
              <div class="card-header text-white bg-primary">
                <b>List-2</b>
              </div>
              <div class="card-body">
                <draggable
                  class="list-group"
                  :list="listDest"
                  group="my-group"
                  @end="updateTree"
                >
                  <div
                    class="list-group-item shadow-lg p-3 bg-white rounded"
                    v-for="element in list2"
                    :key="element.id"
                  >
                    {{element.label}}
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
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Workflow from "@/components/Workflow";
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
    draggable,
    Workflow
  },
  props: {
    listSrc: {
      type: Array,
      required: true
    },
    listDest: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false,
      showWF: false,
      showList: false
    };
  },
  mounted() {
    // this.fetchList();//.then((res)=>this.list = res);
  },
  methods: {
    // ...mapActions("entitiesList", ["fetchList"]),

    ...mapActions("tree", ["updateTreeList"]),
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
      console.log('-------',this.showWF);
      this.showWF = !this.showWF;
      console.log('-------',this.showWF);
      // if (evt.added) {
      //   window.console.log("changed", evt.added.element.id);
      //   this.updateTreeList({ id: evt.added.element.id });
      // }
    },
    updateTree(evt) {
      console.log("updateTree", this.list2[evt.item.newIndex]);
      // this.updateTreeList(obj);
    },
    show(){
      console.log('-----------------');
      this.showWF = !showWF;
    },
    setSelected(value){
      console.log('-------',value);
      console.log('-------',this.showList);
      this.showList = !this.showList;
      console.log('-------',this.showList);
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

<style lang="scss">
// @import 'assets/custom.scss';
@import 'node_modules/bootstrap/scss/bootstrap.scss';
$enable-gradients: true;
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
  border-left: 5px solid #66bb6a !important;
  /**/
}
.list-group-item:hover {
  opacity: 0.7;
  background-color: #fafafa !important;
}
.list-group-item i {
  cursor: pointer;
}
/*FADE*/
.fade-enter-active{
  transition: opacity 1.5s;
}
.fade-leave-active{
  transition: opacity .5s;
} 
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/*slide-fade*/
.slide-fade-enter-active {
  transition: all 1.5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(20px);
  opacity: 0;
}
/*bounce*/
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>