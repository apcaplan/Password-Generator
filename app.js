'use strict'

const characters = {
  0: 'abcdefghijklmnopqrstuvwvyz',
  1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  2: '0123456789',
  3: '!@#$%^&*()-_+=;:<>?,.~{}'
}

const randInt = function (num) {
  return Math.floor(Math.random() * num)
}

const select = function() {
  const char = characters[randInt(4)]
  return char.split('')[randInt(char.length)]
}

const passwordCheck = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_+=;:<>?,.~\{\}])/

function createPassword() {
  let password = ''
  const pwLength = document.getElementById('pwLength').value
  let p = pwLength
  while(p--) {
    password += select()
  }
  if(passwordCheck.test(password)){
    document.getElementById('response').value=password
  } else {
    password = ''
    p = pwLength
    createPassword()
  }
}
