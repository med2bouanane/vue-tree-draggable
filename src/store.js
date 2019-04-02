import Vue from 'vue';
import Vuex from 'vuex';

import entitiesList from "./modules/entitiesList";
import tree from "./modules/tree";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    modules: {
        entitiesList,
        tree
    },
});