import Vue from 'vue';

export async function fetchTree({ commit }) {
    try {
        const { data } = await Vue.axios({
            url: '/tree'
        })
        commit('tree/setTree', data.tree, { root: true })
        console.log('------->', data.tree);
    } catch (e) {
        commit('treeError', e.message)
    } finally {
        console.log('Get Tree OK.')
    }
}