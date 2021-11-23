import React from 'react';

const Conductores = React.lazy(()=> import('./views/base/conductores/Conductores'))
const Camiones = React.lazy(()=> import('./views/base/camiones/Camiones'))
const Transporte = React.lazy(()=> import('./views/base/transporte/transporte'))
const Viajes = React.lazy(()=> import('./views/base/viajes/Viajes'))
const Viajes_lista = React.lazy(()=> import('./views/base/listaViajes/ListaViajes'))
const ControlRutas = React.lazy(()=> import('./views/base/control/control'))
const Rutas = React.lazy(()=> import('./views/base/rutas/rutas'))

const routes = [
    { path: '/control-rutas', exact: true, name: 'Home', component: ControlRutas },
    { path: '/conductores', exact: true, name: 'conductores', component: Conductores },
    { path: '/camiones', exact: true, name: 'camiones', component: Camiones },
    { path: '/transporte', exact: true, name: 'transporte', component: Transporte },
    { path: '/rutas', exact: true, name: 'rutas', component: Rutas },
    { path: '/viajes_lista', exact: true, name: 'rutas', component: Viajes_lista },
    { path: '/viajes', exact: true, name: 'rutas', component: Viajes },
    { path: '/', exact: true, name: 'Home',component: Transporte},
];

export default routes;