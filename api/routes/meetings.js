const { Router } = require('express');

const { sendEmail } = require('../controllers/meetings');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT);

/* Enviar email a un usuario sobre alguna reunion*/
router.post('/sendEmail', sendEmail);

module.exports = router;