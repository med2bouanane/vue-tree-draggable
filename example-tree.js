const tree = [{
        "id": 1,
        "env": [{
            "id": 1,
            "doc": [{
                "id": 1
            }]
        }]
    },
    {
        "id": 2,
        "env": [{
            "id": 2,
            "doc": [{
                "id": 2
            }]
        }]
    }
];

const list1 = [{
        "name": "item-1",
        "fixed": false,
        "order": 1,
        "id": 1
    },
    {
        "name": "item-2",
        "fixed": false,
        "order": 2,
        "id": 2
    },
    {
        "name": "item-3",
        "fixed": false,
        "order": 3,
        "id": 3
    },
    {
        "name": "item-4",
        "fixed": false,
        "order": 4,
        "id": 4
    }
];

const list2 = [];

// console.log('tree', tree);
// console.log('list-1', list1);
// console.log('list-2', list2);

const tretment = (tree_, list1_, depth) => {
    if (depth === 1) {
        return tree_.map(element => {
            return list1_.find(b => b.id === element.id);
        });
    } else if (depth === 2) {
        const res = tree_.map(element => {
            const v = element.env.map((env) => {
                return list1_.find(b => b.id === env.id);
            });
            return v[0];
        });
        console.log('RES----------', res);
        return res;
    } else if (depth === 3) {
        const res = list1_.filter(element => {
            return tree_.filter((t) => {
                return t.env.find(b => b.id === element.id);
            });
            // return v[0];
        });
        console.log('RES----------', res);
        return res;
    }
};


const l = tretment(tree, list1, 2);
console.log('tretment', l);

l.forEach(element => {
    list2.push(element);
    console.log('element', element);
    console.log('list1.indexOf(element)', list1.indexOf(element));
    list1.splice(list1.indexOf(element), 1);
});

console.log('tree', tree);
console.log('list-1', list1)
console.log('list-2', list2)