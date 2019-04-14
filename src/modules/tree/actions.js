import Vue from 'vue';
import axios from 'axios';
import _ from "lodash";


export function updateTreeList(context, payload) {
    try {
        payload.rootState = context.rootState;
        context.commit('tree/updateTreeList', payload, { root: true })

    } catch (e) {
        console.log('fetchList ERROR.')
    } finally {
        console.log('fetchList OK.')
    }
}


export async function fetchTree(context) {
    try {
        let { data } = await axios.get('/tree2')
        const payload = { data: data, rootState: context.rootState };
        context.commit('tree/setTree', payload, { root: true })
            // const reghtList = await getList(data);
        console.log('tree------->', data);
        // console.log('reghtList------->', reghtList);
    } catch (e) {
        console.log('ERROR fetchTree');
    } finally {
        console.log('Get Tree OK.')
    }
}



let getList = async function(tree) {
    try {
        console.log('tree#########3>', tree);
        const list = await axios.get('/list')
        console.log('list------->', list.data);
        const result = updateBatchTree(tree, list.data)
        console.log('result------->', result);
        return result;
    } catch (e) {
        console.log('ERROR getList');
    } finally {
        console.log('Get List--> OK.')
    }
}


const updateBatchTree = (tree, list) => {
    return tree.map(element => {
        const ll = list.filter(l => {
            console.log(l.id + ' | ' + element.id)
            return l.id == element.id;
        });
        console.log('ll', ll);
        const mimap = ll.map((lista) => {
            element.name = lista.name
            console.log(element.name + ' | ' + lista.name);
            return element;
        });
        console.log('mimap', mimap);
        return mimap;
    });
}

const updateEnvelopeTree = (tree, list) => {
    return tree.map(element => {
        const ll = list.filter(l => {
            console.log(l.id + ' | ' + element.id)
            return l.id == element.id;
        });
        console.log('ll', ll);
        const mimap = ll.map((lista) => {
            element.name = lista.name
            console.log(element.name + ' | ' + lista.name);
            return element;
        });
        console.log('mimap', mimap);
        return mimap;
    });
}