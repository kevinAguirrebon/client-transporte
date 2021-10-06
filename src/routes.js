import React from 'react';

const Conductores = React.lazy(()=> import('./views/base/conductores/Conductores'))
const Camiones = React.lazy(()=> import('./views/base/camiones/Camiones'))
const Transporte = React.lazy(()=> import('./views/base/transporte/transporte'))
const Rutas = React.lazy(()=> import('./views/base/rutas/Rutas'))

const routes = [
    { path: '/conductores', exact: true, name: 'conductores', component: Conductores },
    { path: '/camiones', exact: true, name: 'camiones', component: Camiones },
    { path: '/transporte', exact: true, name: 'transporte', component: Transporte },
    { path: '/rutas', exact: true, name: 'rutas', component: Rutas },
    { path: '/', exact: true, name: 'Home',component: Transporte},
];

export default routes;