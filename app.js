'use strict'

const lower = 'abcdefghijklmnopqrstuvwvyz'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const number =  '0123456789'
const symbols = '!@#$%^&*()-_+=;:<>?,.~{}'

const characters = {}

let passwordCheck

const randInt = function (num) {
  return Math.floor(Math.random() * num)
}

function clearObject () {
  for (const x in characters) {
    if(characters.hasOwnProperty(x)){
      delete characters[x]
    }
  }
}

function makeCharacterObject() {
  clearObject()
  let temp = []
  let forRegEx = ''
  if(document.getElementById('lowercase').checked){
    temp.push(lower)
    forRegEx += '(?=.*[a-z])'
  }
  if(document.getElementById('uppercase').checked){
    temp.push(upper)
    forRegEx += '(?=.*[A-Z])'
  }
  if(document.getElementById('numbers').checked){
    temp.push(number)
    forRegEx += '(?=.*[0-9])'
  }
  if(document.getElementById('symbols').checked){
    temp.push(symbols)
    forRegEx += '(?=.*[!@#$%^&*()\\-_+=;:<>?,.~\\{\\}])'
  }
  temp.forEach(element => {
    characters[temp.indexOf(element)] = element
  })
  passwordCheck = new RegExp(forRegEx)
}

function select() {
  const char = characters[randInt(Object.keys(characters).length)]
  return char.split('')[randInt(char.length)]
}

function generatePassword() {
  let password = ''
  const pwLength = document.getElementById('pwLength').value
  let p = pwLength
  document.getElementById('warning').innerHTML=''
  if(!pwLength){
    document.getElementById('warning').innerHTML='Please enter a password length!'
  } else if (pwLength < 4) {
    document.getElementById('warning').innerHTML='Password length must be at least 4'
  } else if (Object.keys(characters).length === 0) {
    document.getElementById('warning').innerHTML='Please check at least one box!'
  } else {
  while(p--) {
    password += select()
  }
  if(passwordCheck.test(password)){
    document.getElementById('response').value = password
  } else {
    password = ''
    p = pwLength
    generatePassword()
  }
}
}

function createPassword() {
  makeCharacterObject()
  generatePassword()
}
