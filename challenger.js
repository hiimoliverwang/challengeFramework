/**
 * Created by oliverwang on 4/18/16.
 */
'use strict'
const compareParent = (arr1, arr2) => {
  if (arr1.length === 0 || arr2.length === 0) return false
  const childArray = arr2.slice(0, -1)
  for (var i = arr1.length - 1; i >= 0; i--) {
    const currElement = arr1[i];
    if (currElement === childArray[childArray.length - 1]) {
      childArray.pop()
    }
  }
  return childArray.length === 0
}

function *DFS(node, parent = []) {
  yield {node, parent}
  for (let key in node) {
    if (node.hasOwnProperty(key) && node[key]) {
      if (Array.isArray(node[key])) {
        for (let i = 0; i < node[key].length; i++) {
          const childNode = node[key][i];
          yield *DFS(childNode, parent.concat(node.type))
        }
      } else if (node[key].type) {
        yield *DFS(node[key], parent.concat(node.type))
      }
    }
  }
}

module.exports.check = (nodeName, tree)=> {
  for (let {node} of DFS(tree)) {
    if (node.type === nodeName) {
      return true
    }
  }
  return false
}

module.exports.checkStructure = (statementStructure, tree)=> {
  const lastChild = statementStructure[statementStructure.length - 1]
  for (let {node, parent} of DFS(tree)) {
    if (node.type === lastChild && compareParent(parent, statementStructure)) {
      return true
    }
  }
  return false
}


