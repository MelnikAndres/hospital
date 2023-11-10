const db = require('./DBconnection')


class Filterable {
    tableName;
    filters = [];
    constructor(tableName) {
        this.tableName = tableName;
    }

    consumeQuery(){
        const selectQuery = `SELECT * FROM ${this.tableName}` + (this.filters.length > 0 ? " WHERE " : "")
        let compareQuery = ""
        for (let i = 0; i < this.filters.length; i++) {
            const filter = this.filters[i];
            compareQuery += `${filter.key} ${filter.compare} '${filter.value}'` + (i < this.filters.length - 1 ? " AND " : ";")
        }
        const query = selectQuery + compareQuery
        this.filters = []
        return db.any(query)
    }

    addFilter(filter){
        this.filters.push(filter)
    }
}

class Filter {
    key;
    compare;
    value;
    constructor(key, compare, value) {
        this.key = key;
        this.compare = compare;
        this.value = value;
    }
}

module.exports.Filterable = Filterable
module.exports.Filter = Filter