'use strict'

const _ = require('lodash')

// bluebird, permite usar promesas y callbacks al mismo tiempo
const Promise = require('bluebird')

// se normalizan los paths, asi funciona wn windows y osx, etx
var normalizedPath = require('path').join(__dirname, '../skills')

// aqui se van a guardar las skills, que son scripts externos
var skills = []
require('fs').readdirSync(normalizedPath).forEach(function (file) {
  // crea un identificador de skills a partir del nombre de archivo
  let skillName = file.replace(/.js$/g, '')
  // agrega la skill al listado de skills
  skills.push({
    name: skillName,
    actions: require('../skills/' + file)
  })
})

class Skills {
  // recibe un nombre de Skills
  // busca en una base de datos si este existe
  static getSkillList () {
    let skillList = skills.map((x) => {
      return x.name
    })
    return Promise.resolve(skillList)
  }

  constructor (name) {
    let setup = this.setup.bind(this)
    this.name = null
    this.invalid = false
    this.error = null

    this.validate(name, (err, skill) => {
      if (err) return err
      setup(skill.name)
    })
  }

  setup (name, images) {
    this.name = name
  }

  // Activar la skill, no se porqque deje push on en ves de activate
  pushOn (images, cb) {
    // debe asegurar que la skill sea valida
    if (this.invalid) {
      return Promise.reject(this.error).asCallback(cb)
    }

    // asegura que los objetos de imagen sean validos
    if (!images || images.length !== 4) {
      return Promise.reject(new Error('invalid images')).asCallback(cb)
    }

    // busca el nombre de la skill a jecutar en el listado de skills
    let data = _.find(skills, {name: this.name})

    // la accion es una promesa
    let skill = data.actions

    // que devuelve el resultado cuando termina de ejecutarse
    return Promise.resolve(skill.exec(images)).asCallback(cb)
  }

  // se busca si la skill es valida
  validate (name, cb) {
    let skill = _.find(skills, {name: name})
    let err = null
    if (!skill) {
      this.invalid = true
      err = new Error('Skill not found')
      this.error = err
    }
    cb(err, skill)
  }

  fail () {
    return 'invalid skill name'
  }
}

module.exports = Skills
