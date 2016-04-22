var challenger = require('./challenger')
const esprima = require('esprima')

const whitelist = ['ForStatement', 'IfStatement']
const blacklist = ['WhileStatement', 'VariableDeclaration']
const structure = [['IfStatement', 'VariableDeclaration']]

const parse = (code) => {
  return new Promise((resolve) => {
    resolve(esprima.parse(code))
  })
}

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
      .catch((err)=> {
      })
  })
})

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

const joinStructureList = (char, list) => list.map(el => el.join(char))

const addStructureToDisplay = (appendClass, list) => {
  addToDisplay(appendClass, joinStructureList('', list), joinStructureList(' -> ', list))
}



