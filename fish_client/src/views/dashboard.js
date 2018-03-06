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

const Dashboard = {
  view (vnode) {
    return [
      m('.header.text-center.mb-4',

        m('h4', 'Bienvenido a'),
        m('h1.mb-3', 'Buxton'),
        m('h5',
          m('em',
            'Powered by ',
            m('strong', 'Sawtooth Supply Chain')))),
      m('.blurb',
        m('p',
          m('strong', 'Buxton'),
          ' ha sido creado con Hyperledger Sawtooth',
          m('a[href="https://github.com/hyperledger/sawtooth-core"]',
            { target: '_blank' }),
          ' La tecnologia blockchain mantiene un ledger distribuido  ',
          'que traza la provenencia y la marca de tiempo sobre teléfonos y vino ',
          ' (los dos productos utilizados en este prototipo). ' +
            'Detallando como el producto ha sido guardado, administrado y transportado.'),
        m('p',
          m('strong', 'Buxton'),
          ' es un prototipo desarrola por Carlos Roldan que utiliza blockchain para supply chain. ' +
            'El propósito de este prototipo es mostrar un mínimo de experiencia y comodidad usando Hyperledger Sawtooth.'),
          m('h2', 'Empieza'),
          m('p', 'Para utilizar ',
          m('strong', 'Buxton'),
          ', crea una cuenta en el botón entrar the la barra de navegación de arriba. ',
              'Una vez identificado, podras regisrar un producto ',
              'en la blockchain y tracearlo con datos del producto, tales como su tamaño, peso or localización',
          '. Además, podrás autorizar otros "administradores" en la blockchain con ',
          'permisos para tracear los productos, o incluso transferir el derecho',
              ' de propiedad o posesión de dichos productos. '))
    ]
  }
}

module.exports = Dashboard
