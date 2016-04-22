/**
 * Created by oliverwang on 4/18/16.
 *
 * This module contains the main functionality of the program. It exposes two
 * API's: check and checkStructure. They both return a boolean that represent the
 * They both take parsed trees as a second argument,and return a boolean representing
 * the presence of the element in question. 
 */


'use strict'

/*
compare parent is used to compare the target hierarchy to the yielded hierarchy 
 */

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

/*
Depth-First-Search generator to traverse through the tree representing the parsed code.
It yeilds an object of {node:node, parent:[string]}
 */

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


/*
Takes a string of the name of the node (e.g. "IfStatement") and returns a boolean 
 */

module.exports.check = (nodeName, tree)=> {
  for (let {node} of DFS(tree)) {
    if (node.type === nodeName) {
      return true
    }
  }
  return false
}


/*
 Takes an array of strings representing the hierarchy of elements
  (e.g. ['IfStatement', 'ForStatement']) and returns a boolean
 */
module.exports.checkStructure = (statementStructure, tree)=> {
  const lastChild = statementStructure[statementStructure.length - 1]
  for (let {node, parent} of DFS(tree)) {
    if (node.type === lastChild && compareParent(parent, statementStructure)) {
      return true
    }
  }
  return false
}


