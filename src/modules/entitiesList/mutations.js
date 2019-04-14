export function setList(state, payload) {
    state.list = payload.list;
    state.list2 = payload.list2;
};

export function updateLists(state, payload) {
    payload.rootState.tree.type = payload.type;
    payload.rootState.tree.parentId = payload.id;
    state.list2 = [];
    if (payload.type === "BATCH") {
        const batchTreeList = payload.rootState.tree.treeComponent.treeData[0].children;
        batchTreeList.forEach(batchTree => {
            state.batchList.forEach(batchList => {
                if (batchList.id === batchTree.id && !isDuplicate(state.list2, batchList)) {
                    state.list2.push(batchList);
                }
            })
        });
        state.list = state.batchList.filter(x => !state.list2.includes(x));
    } else if (payload.type === "ENV") {
        const batchTreeList = payload.rootState.tree.treeComponent.treeData[0].children;
        batchTreeList.forEach(batchTree => {
            batchTree.children.forEach((envelopeTree) => {
                if (payload.id === batchTree.id) {
                    state.envelopeList.forEach(envelopeList => {
                        if (envelopeList.id === envelopeTree.id && !isDuplicate(state.list2, envelopeList)) {
                            state.list2.push(envelopeList);
                        }
                    })
                }
            })
        });
        state.list = state.envelopeList.filter(x => !state.list2.includes(x));
    } else if (payload.type === "DOC") {
        const batchTreeList = payload.rootState.tree.treeComponent.treeData[0].children;
        batchTreeList.forEach(batchTree => {
            batchTree.children.forEach((envelopeTree) => {
                envelopeTree.children.forEach(documentTree => {
                    if (payload.id === envelopeTree.id) {
                        state.documentList.forEach(documentList => {
                            if (documentList.id === documentTree.id && !isDuplicate(state.list2, documentList)) {
                                state.list2.push(documentList);
                            }
                        })
                    }
                })
            })
        });
        state.list = state.documentList.filter(x => !state.list2.includes(x));
    }
}

const isDuplicate = (list, element) => list.indexOf(element) !== -1;