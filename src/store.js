import Vue from 'vue';
import Vuex from 'vuex';

import entities from "./modules/entity-list";
import tree from "./modules/tree";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    modules: {
        entities,
        tree
    },
});