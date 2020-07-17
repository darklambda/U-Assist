/*
    Rutas de usuarios /auth
    host + api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createClient, createExecutive, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/newClient',
            [
                check('nombre', 'El nombre debe tener 3 caracteres o más').isLength({ min:3 }),
                check('apellido', 'El apellido debe tener 2 caracteres o más').isLength({ min:2 }),
                check('rut', 'RUT inválido').not().isEmpty(),
                check('region', 'La región es obligatoria').not().isEmpty(),
                check('comuna', 'La comuna es obligatoria').not().isEmpty(),
                check('direccion', 'La dirección es obligatoria').not().isEmpty(),
                check('telefono', 'El telefono debe contener 8 dígitos').isLength({ min:8, max:8 }),
                check('email', 'Ingrese un email válido').isEmail(),
                check('password', 'La contraseña debe tener 6 caracteres o más').isLength({ min:6 }),
                validarCampos
            ], 
            createClient
);

router.post('/newExecutive',
            [
                check('nombre', 'El nombre debe tener 3 caracteres o más').isLength({ min:3 }),
                check('apellido', 'El apellido debe tener 2 caracteres o más').isLength({ min:2 }),
                check('sucursal', 'La sucursal es obligatoria').not().isEmpty(),
                check('telefono', 'El telefono debe contener 8 dígitos').isLength({ min:8, max:8 }),
                check('email', 'Ingrese un email válido').isEmail(),
                check('password', 'La contraseña debe tener 6 caracteres o más').isLength({ min:6 }),
                validarCampos
            ], 
            createExecutive
);

router.post('/', 
            [
                check('email', 'Ingrese un email válido').isEmail(),
                check('password', 'Contraseña incorrecta').isLength({ min:6 }),
                validarCampos
            ],
            loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;