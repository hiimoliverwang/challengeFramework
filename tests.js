/**
 * Created by oliverwang on 4/21/16.
 */
"use strict";

const challenger = require('./challenger')
const esprima = require('esprima')
const assert = require('assert')

//check for if statements
let code =
`if(true){
    
}`
let codeTree = esprima.parse(code)
assert.equal(challenger.check('IfStatement',codeTree),true)
assert.equal(challenger.check('WhileStatement',codeTree),false)
assert.equal(challenger.checkStructure(['IfStatement', 'VariableDeclaration'],codeTree),false)

//check for while statements
code =
`while(true){
  
}`
codeTree = esprima.parse(code)
assert.equal(challenger.check('IfStatement',codeTree),false)
assert.equal(challenger.check('WhileStatement',codeTree),true)
assert.equal(challenger.checkStructure(['IfStatement', 'VariableDeclaration'],codeTree),false)

//check for if containing a variable declaration
code =
`if(true){
  var a
}`
codeTree = esprima.parse(code)
assert.equal(challenger.check('IfStatement',codeTree),true)
assert.equal(challenger.check('WhileStatement',codeTree),false)
assert.equal(challenger.checkStructure(['IfStatement', 'VariableDeclaration'],codeTree),true)

//edge case
code = ''
codeTree = esprima.parse(code)
assert.equal(challenger.check('IfStatement',codeTree),false)
assert.equal(challenger.check('WhileStatement',codeTree),false)
assert.equal(challenger.checkStructure(['IfStatement', 'VariableDeclaration'],codeTree),false)

console.log('test passed');

