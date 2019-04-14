import Vue from 'vue';

export async function fetchList({ commit }) {
    try {
        const { data } = await Vue.axios({
            url: '/list'
        })
        const payload = { list: data, list2: [] };
        commit('entitiesList/setList', payload, { root: true })
        console.log('LIST ------->', data);
        return data;
    } catch (e) {
        commit('treeError', e.message)
    } finally {
        console.log('fetchList OK.')
    }
}

export function updateLists(context, payload) {
    try {
        payload.rootState = context.rootState;
        context.commit('entitiesList/updateLists', payload, { root: true })
    } catch (e) {
        console.log('fetchList ERROR.')
    } finally {
        console.log('fetchList OK.')
    }
}