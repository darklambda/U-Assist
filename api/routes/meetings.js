const { Router } = require('express');

const { sendEmail } = require('../controllers/meetings');

const router = Router();

/* Enviar email a un usuario sobre alguna reunion*/
router.post('/sendEmail', sendEmail);

module.exports = router;