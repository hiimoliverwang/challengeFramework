/*
This module contains all of the DOM related code. 
 */

var challenger = require('./challenger')
const esprima = require('esprima')

/*
whitelist: the recieved code must have these elements
blacklist: the received code cannot have these elements
structure: the received code must have a rough structure representing each of the arrays
in descending order
 */
const whitelist = ['ForStatement', 'IfStatement']
const blacklist = ['WhileStatement', 'VariableDeclaration']
const structure = [['IfStatement', 'VariableDeclaration'],['IfStatement', 'WhileStatement']]


/*
Parses the code asynchronously 
 */
const parse = (code) => {
  return new Promise((resolve) => {
    resolve(esprima.parse(code))
  })
}


/*
Updates the DOM based on the presence of each of the requirements
 */
const updateDisplay = (parsed) => {
  whitelist.forEach(statement=> {
    const element = document.getElementsByClassName(statement)[0]
    element.className = statement
    if (challenger.check(statement, parsed)) {
      element.className = statement + ' finish'
    }
  })

  blacklist.forEach(statement=> {
    const element = document.getElementsByClassName(statement)[0]
    element.className = statement + ' finish'
    if (challenger.check(statement, parsed)) {
      element.className = statement
    }
  })

  structure.forEach(structureList=> {
    const structureString = structureList.join('')
    const element = document.getElementsByClassName(structureString)[0]
    element.className = structureString
    if (challenger.checkStructure(structureList, parsed)) {
      element.className = structureString + ' finish'
    }
  })
}

/*
Initial rendering of the requirements onto the DOM, as well as initialize
the editor. 
 */

document.addEventListener("DOMContentLoaded", e=> {
  addToDisplay('whitelist', whitelist)
  addToDisplay('blacklist', blacklist)
  addStructureToDisplay('structure', structure)
  var editor = ace.edit('editor')
  editor.setTheme('ace/theme/twilight')
  editor.session.setMode('ace/mode/javascript')
  editor.getSession().on('change', e => {
    parse(editor.getValue())
      .then(updateDisplay)
      .catch(()=> {
      })
  })
})


/*
Add each element to the appropriate <ul> in the DOM, assigning each element
the same class as the name of the element
 */
const addToDisplay = (appendClass, classList, textList=classList) => {
  const ulElement = document.getElementsByClassName(appendClass)[0]
  classList.forEach((word,i) => {
    const newLi = document.createElement('li')
    newLi.setAttribute('class', word)
    const newText = document.createTextNode(textList[i])
    newLi.appendChild(newText)
    ulElement.appendChild(newLi)
  })
}

/*
The class for rendering structure is simply all of the elements in the structure 
concatenated together
 */
const joinStructureList = (char, list) => list.map(el => el.join(char))

const addStructureToDisplay = (appendClass, list) => {
  addToDisplay(appendClass, joinStructureList('', list), joinStructureList(' -> ', list))
}



