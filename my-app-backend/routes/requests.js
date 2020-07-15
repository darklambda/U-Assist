/*
    Rutas de solicitudes 
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getRequestsClient, getRequestsExecutive, createRequest, updateRequest, deleteRequest} = require('../controllers/requests');

const router = Router();

router.use(validarJWT);

/* Obtener soliciutdes */
router.get('/', getRequestsClient);
router.get('/solicitudes', getRequestsExecutive);

/* Crear solicitud */
router.post('/', 
            [
                check('categoria', 'La categoría es obligatoria').not().isEmpty(),
                check('codigo', 'El código del problema es obligatorio').not().isEmpty(),
                check('nombreCodigo', 'El nombre del código es obligatorio').not().isEmpty(),
                check('descripcionProblema', 'Debe incluir una descripción del problema').not().isEmpty(),
                validarCampos
            ], 
            createRequest
);

/* Actualizar solicitud */
router.put('/:id',
            [
                check('categoria', 'La categoría es obligatoria').not().isEmpty(),
                check('codigo', 'El código del problema es obligatorio').not().isEmpty(),
                check('nombreCodigo', 'El nombre del código es obligatorio').not().isEmpty(),
                check('descripcionProblema', 'Debe incluir una descripción del problema').not().isEmpty(),
                validarCampos
            ], 
            updateRequest
);

/* Eliminar solicitud */
router.delete('/:id', deleteRequest);

module.exports = router;