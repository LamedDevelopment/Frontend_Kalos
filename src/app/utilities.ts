/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable id-blacklist */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */


const plans: any = [
    {
        id: 0,
        title: 'User',
        content: '',
        url: '/home',
        icon:'user',
        childs: [
            {path: '/user/appo', name: 'Citas'},
            {path: '/user/account', name: 'Cuenta' },
            {path: '/user/dash', name: 'Dashboard' },
            {path: '/user/invoiced', name: 'Detalle de factura' },
            {path: '/user/invoicel', name: 'Lista de facturas' },
            {path: '/user/lounges', name: 'Salones' },
            {path: '/user/pay', name: 'Pago' },
            {path: '/user/pays', name: 'Pagos' },
            {path: '/user/services', name: 'Servicios' },
        ]
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
