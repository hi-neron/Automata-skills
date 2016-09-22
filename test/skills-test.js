'use strict'

const test = require('ava')
const Skills = require('../')

test('Skills should create an skill', async t => {
  let skillname = 'crab'
  let images = [{image: 1}, {image: 2}, {image: 3}, {image: 4}]
  // debe crear un objeto skill
  // debe asegurar que el skill exista en el sistema
  let skill = new Skills(skillname)
  // debe recibir un array de objetos para interactuar
  let dataReady = await skill.pushOn(images)

  // debe ejecutar la skill y devolver los objetos reorganizados
  console.log(dataReady)
  t.is(skill.name, skillname)
  t.is(dataReady.length, 4)

  // debe asegurar que el arrya de imagenes sea 4
  t.throws(skill.pushOn([{1: 1}]), /invalid/)
  t.throws(skill.pushOn(), /invalid/)

  let skill2 = new Skills('not exists')
  // debe asegurar que el objeto skill sea valido
  t.throws(skill2.pushOn([{1: 1}, {1: 1}, {1: 1}, {1: 1}]), /not found/)
})
