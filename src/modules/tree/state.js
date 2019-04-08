export default {
    tree: {},
    treeComponent: {
        openAll: true,
        treeTypes: [{
                type: "#",
                max_children: 6,
                max_depth: 4,
                valid_children: [
                    "ROOT",
                    "BATCH",
                    "ENV",
                    "DOC"
                ]
            },
            {
                type: "ROOT",
                icon: "fas fa-sitemap",
                valid_children: ["BATCH", "ENV", "DOC"]
            },
            {
                type: "BATCH",
                icon: "fas fa-inbox",
                valid_children: ["ENV", "DOC"]
            },
            {
                type: "ENV",
                icon: "fas fa-folder",
                valid_children: ["DOC"]
            },
            {
                type: "DOC",
                icon: "fas fa-file-alt",
                valid_children: []
            }
        ],
        treeData: [{
            id: 100767.0,
            text: "Root",
            type: "ROOT",
            count: 0,
            children: []

        }],
        contextItems: [],
        selectedNode: null
    }
}