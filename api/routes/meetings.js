const { Router } = require('express');

const { createMeeting } = require('../controllers/meetings');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT);

/* Enviar email a un usuario sobre alguna reunion*/
router.post('/createMeeting', createMeeting);

module.exports = router;