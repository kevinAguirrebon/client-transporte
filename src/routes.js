import React from 'react';

const Conductores = React.lazy(()=> import('./views/base/conductores/Conductores'))
const Camiones = React.lazy(()=> import('./views/base/camiones/Camiones'))
const Transporte = React.lazy(()=> import('./views/base/transporte/transporte'))
const Rutas = React.lazy(()=> import('./views/base/rutas/Rutas'))
const Viajes = React.lazy(()=> import('./views/base/viajes/viajes'))
const ControlRutas = React.lazy(()=> import('./views/base/control/control'))

const routes = [
    { path: '/control-rutas', exact: true, name: 'Home', component: ControlRutas },
    { path: '/conductores', exact: true, name: 'conductores', component: Conductores },
    { path: '/camiones', exact: true, name: 'camiones', component: Camiones },
    { path: '/transporte', exact: true, name: 'transporte', component: Transporte },
    { path: '/rutas', exact: true, name: 'rutas', component: Rutas },
    { path: '/lista-viajes', exact: true, name: 'rutas', component: Viajes },
    { path: '/', exact: true, name: 'Home',component: Transporte},
];

export default routes;