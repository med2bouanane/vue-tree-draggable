export function setTree(state, payload) {
    state.tree = payload.data;
    buildtreeComponent(payload.rootState.entitiesList, payload.data, state.treeComponent)
};




const buildtreeComponent = (rootState, tree, treeComponent) => {
    //BATCH
    tree.forEach(batchTree => {
        const batchList = rootState.batchList.find(batchList => batchList.id === batchTree.id)
        batchTree.code = batchList.code;
        batchTree.text = batchList.label;
        batchTree.type = "BATCH";
        // ENV
        batchTree.env_list.forEach((envTree) => {
            const envList = rootState.envelopeList.find(envList => envList.id === envTree.id)
            envTree.code = envList.code;
            envTree.text = envList.label;
            envTree.type = "ENV";
            // DOC
            envTree.doc_list.forEach((docTree) => {
                const docList = rootState.documentList.find(docList => docTree.id === docList.id)
                docTree.code = docList.code;
                docTree.text = docList.label;
                docTree.type = "DOC";
            })
        })
    });

    treeToTreeComponent(tree, treeComponent)
};


const treeToTreeComponent = (tree, treeComponent) => {
    console.log('TREE==============>', tree);
    let strTree = JSON.stringify(tree);
    strTree = strTree.replace(/env_list/g, 'children');
    strTree = strTree.replace(/doc_list/g, 'children');
    tree = JSON.parse(strTree);
    treeComponent.treeData[0].children = tree.slice();
    console.log('TREECOMPONENT==============>', treeComponent);
};

export function updateTreeList(state, payload) {
    if (state.type === "BATCH") {
        // let v = state.tree;
        // console.log('v-1', v);
        const v = state.tree.filter(batchTree => batchTree.id !== payload.id)
        console.log('v-2', v);

        buildtreeComponent(payload.rootState.entitiesList, v, state.treeComponent)
    } else if (state.type === "ENV") {
        let v = state.tree;
        console.log('v-1', v);
        state.tree.forEach((batchTree) => {
            if (state.parentId === batchTree.id) {

                batchTree.env_list.filter(envelopeTree => {
                    console.log('envelopeTree.id !== payload.id}', envelopeTree + ' / ' + payload.id);
                    return envelopeTree.id !== payload.id
                })
                console.log('loop v-2', v);


            }
        })
        console.log('v-2', v);

        buildtreeComponent(payload.rootState.entitiesList, v, state.treeComponent)
    }
}







// const buildtreeComponent = (rootState, tree, treeComponent) => {
//     //BATCH
//     tree.forEach(batchTree => {
//         rootState.batchList.forEach((batchList) => {
//             if (batchList.id == batchTree.id) {
//                 batchTree.code = batchList.code;
//                 batchTree.text = batchList.label;
//                 batchTree.type = "BATCH";
//             }
//         });
//         batchTree.env_list.forEach((envTree) => {
//             rootState.envelopeList.forEach((envList) => {
//                 if (envList.id == envTree.id) {
//                     envTree.code = envList.code;
//                     envTree.text = envList.label;
//                     envTree.type = "ENV";
//                 }
//             })
//             envTree.doc_list.forEach((docTree) => {
//                 rootState.documentList.forEach((docList) => {
//                     if (docTree.id == docList.id) {
//                         docTree.code = docList.code;
//                         docTree.text = docList.label;
//                         docTree.type = "DOC";
//                     }
//                 })
//             })
//         })
//     });

//     console.log('TREE==============>', tree);
//     let strTree = JSON.stringify(tree);
//     strTree = strTree.replace(/env_list/g, 'children');
//     strTree = strTree.replace(/doc_list/g, 'children');
//     tree = JSON.parse(strTree);
//     treeComponent.treeData[0].children = tree.slice();
//     console.log('TREECOMPONENT==============>', treeComponent);
// };







// const buildtreeComponent2 = (rootState, tree, treeComponent) => {
//     //BATCH
//     tree.forEach(batchTree => {
//         rootState.batchList.forEach((batchList) => {
//             if (batchList.id == batchTree.id) {
//                 batchTree.code = batchList.code;
//                 batchTree.text = batchList.label;
//                 batchTree.type = "BATCH";
//             }
//         })
//     });
//     // ENV
//     tree.forEach(batchTree => {
//         batchTree.env_list.forEach((envTree) => {
//             rootState.envelopeList.forEach((envList) => {
//                 if (envList.id == envTree.id) {
//                     envTree.code = envList.code;
//                     envTree.text = envList.label;
//                     envTree.type = "ENV";
//                 }
//             })
//         })
//     });
//     // DOC
//     tree.forEach(batchTree => {
//         batchTree.env_list.forEach((envTree) => {
//             envTree.doc_list.forEach((docTree) => {
//                 rootState.documentList.forEach((docList) => {
//                     if (docTree.id == docList.id) {
//                         docTree.code = docList.code;
//                         docTree.text = docList.label;
//                         docTree.type = "DOC";
//                     }
//                 })
//             })
//         })
//     });

//     console.log('TREE==============>', tree);
//     let strTree = JSON.stringify(tree);
//     strTree = strTree.replace(/env_list/g, 'children');
//     strTree = strTree.replace(/doc_list/g, 'children');
//     tree = JSON.parse(strTree);
//     treeComponent.treeData[0].children = tree.slice();
//     console.log('TREECOMPONENT==============>', treeComponent);
// };