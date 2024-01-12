/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable id-blacklist */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */


const plans: any = [
    {
        id: 0,
        title: 'Cliente',
        content: '',
        url: '/home',
        icon:'user',
        childs: [
            {path: '/user/appo', name: 'Citas'},
            {path: '/user/account', name: 'Cuenta' },
            {path: '/user/dash', name: 'Dashboard' },
            // {path: '/user/invoiced', name: 'Detalle de factura' },
            {path: '/user/billetera', name: 'Lista de facturas' },
            {path: '/user/lounges', name: 'Salones' },
            /* {path: '/user/pay', name: 'Pago' },
            {path: '/user/pays', name: 'Pagos' },
            {path: '/user/services', name: 'Servicios' },*/
        ],
        rol:'USER_ROLE'
    },
    {
        id: 0,
        title: 'Negocio',
        content: '',
        url: '/home',
        icon:'user',
        childs: [
            {path: '/bus/account', name: 'Cuenta' },
            {path: '/bus/appoinments', name: 'Citas' },
            {path: '/bus/collas', name: 'Colaboradores'},
        ],
        rol:'MANAGER_ROLE'
    },
    {
        id: 0,
        title: 'Colaborador',
        content: '',
        url: '/home',
        icon:'user',
        childs: [
            {path: '/colla/account', name: 'Cuenta' },
            {path: '/colla/appoinments', name: 'Citas' },
        ],
        rol:'CLLTR_ROLE'
    },

];
const register_types: any = [
    {
        id: 0,
        title: 'Principal',
        content: '',
        url: 'principal',
        icon:''
    },
];

export const UTILITIES_CONSTANTS = Object.freeze({
    plans: plans,
    register_types: register_types,
});
