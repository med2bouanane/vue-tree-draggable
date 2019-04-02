import Vue from 'vue';

export async function fetchList({ commit }) {
    try {
        const { data } = await Vue.axios({
            url: '/list'
        })
        commit('entitiesList/setList', data, { root: true })
        console.log('LIST ------->', data);
        return data;
    } catch (e) {
        commit('treeError', e.message)
    } finally {
        console.log('Get Tree OK.')
    }
}