/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */
'use strict'

const m = require('mithril')
const _ = require('lodash')

const forms = require('../components/forms')
const api = require('../services/api')
const transactions = require('../services/transactions')
const payloads = require('../services/payloads')

const passwordCard = state => {
  const setter = forms.stateSetter(state)
  const validator = forms.validator(
    () => state.password === state.confirm,
    'Las contraseñas no coincided',
    'confirmar'
  )
  const passwordField = (id, placeholder) => {
    return forms.field(
      // Run both state setting and validation on value changes
      _.flow(setter(id), validator),
      {
        id,
        placeholder,
        type: 'password',
        class: 'border-warning'
      }
    )
  }

  return forms.group('Password', [
    m('.card.text-center.border-warning',
      m('.card-header.text-white.bg-warning', m('em', m('strong', 'ATENCIÓN!'))),
      m('.card-body.text-warning.bg-light',
        m('p.card-text',
          'Esta contraseña será utilizada como clave secreta para encriptar la cuenta.',
          m('em',
            ' Si se pierde u olvida será ',
            m('strong', 'imposible'),
            ' recuperar la cuenta.')),
        m('p.card-text', 'Guárdala de manera segura.'),
        passwordField('password', 'Contraseña...'),
        passwordField('confirm', 'Confirma contraseña...')))
  ])
}

const userSubmitter = state => e => {
  e.preventDefault()

  const keys = transactions.makePrivateKey(state.password)
  const user = _.assign(keys, _.pick(state, 'username', 'email'))
  user.password = api.hashPassword(state.password)
  const agent = payloads.createAgent(_.pick(state, 'name'))

  transactions.submit(agent, true)
    .then(() => api.post('users', user))
    .then(res => api.setAuth(res.authorization))
    .then(() => m.route.set('/'))
}

/**
 * The Form for authorizing an existing user.
 */
const SignupForm = {
  view (vnode) {
    const setter = forms.stateSetter(vnode.state)

    return m('.signup-form', [
      m('form', { onsubmit: userSubmitter(vnode.state) },
      m('legend', 'Crear Administrador'),
      forms.textInput(setter('name'), 'Nombre'),
      forms.emailInput(setter('email'), 'Email'),
      forms.textInput(setter('username'), 'Nombre de Usuario'),
      passwordCard(vnode.state),
      m('.container.text-center',
        'O puede entrar ',
        m('a[href="/login"]',
          { oncreate: m.route.link },
          'si ya está registrado')),
      m('.form-group',
        m('.row.justify-content-end.align-items-end',
          m('col-2',
            m('button.btn.btn-primary',
              'Crear')))))
    ])
  }
}

module.exports = SignupForm
