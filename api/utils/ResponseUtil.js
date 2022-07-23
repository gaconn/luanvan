class ResponseUtil{
    response = (isSuccess, message, data=[], arrError = []) =>{
        return {success: isSuccess, message: message, data, error: arrError}
    }

    makeTree = (parent, list) => {
        if(!parent || !parent.length === 0) {
            return null
        }

        if(!list || list.length === 0) {
            return null
        }
        for (let p = 0 ; p< parent.length ; p++) {
            var listChild = []
            for(let i= 0 ; i < list.length ; i++) {
                if(list[i].IDTheLoaiCha === parent[p].id) {
                    listChild.push(list[i])
                    list.splice(i, 1)
                    i--
                }
            }
            var node = this.makeTree(listChild, list)
            parent[p].listChild = node
        }
        return parent
    }
}

module.exports = new ResponseUtil()