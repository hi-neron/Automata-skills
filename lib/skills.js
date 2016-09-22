'use strict'

const _ = require('lodash')
const Promise = require('bluebird')

var normalizedPath = require('path').join(__dirname, '../skills')
var skills = []

require('fs').readdirSync(normalizedPath).forEach(function (file) {
  let skillName = file.replace(/.js$/g, '')
  skills.push({
    name: skillName,
    actions: require('../skills/' + file)
  })
})

class Skills {
  // recibe un nombre de Skills
  // busca en una base de datos si este existe

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

  pushOn (images, cb) {
    // debe asegurar que la skill sea valida
    if (this.invalid) {
      return Promise.reject(this.error).asCallback(cb)
    }

    // asegura que los objetos de imagen sean validos
    if (!images || images.length !== 4) {
      return Promise.reject(new Error('invalid images')).asCallback(cb)
    }

    let data = _.find(skills, {name: this.name})
    let skill = data.actions

    return Promise.resolve(skill.exec(images)).asCallback(cb)
  }

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
