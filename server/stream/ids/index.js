var streamIDS = {
    news: [{
        name: 'NYT',
        id: 1255671
    }, {
        name: 'Guardian',
        id: 87818409
    }, {
        name: 'bbcworld',
        id: 742143
    }, {
        name: 'bbcnews',
        id: 612473
    }, {
        name: 'washingtonpost',
        id: 2467791
    }, {
        name: 'theatlantic',
        id: 35773039
    }, {
        name: 'newrepublic',
        id: 82689705
    }, {
        name: 'vice',
        id: 23818581
    }, {
        name: 'Mali',
        id: 250417923
    }],
    seeds: [{
        name: 'AP',
        id: 51241574
    }]
}

streamIDS.getStreamIDs = function(streamKey) {
    var ids = [];

    this[streamKey].forEach(function(el, i) {
        ids.push(el.id);
    });

    return ids.toString();
}

module.exports = streamIDS;