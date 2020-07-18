/* Acciones para modificar el estado de la aplicación */

export const types = {

    AUTH_CHECKED:               'Estado del inicio de sesión chequeado',
    AUTH_START_LOGIN:           'Comienza el proceso de login',
    AUTH_LOGIN:                 'Comienza el logueo del usuario (async)',
    AUTH_START_REGISTER:        'Comienza el registro de usuario',
    AUTH_START_TOKEN_RENEW:     'Comienza renovación de JWT',
    AUTH_LOGOUT:                'Cierre de sesión de usuario',

    REQUEST_CREATION:           'Registro de solicitud en BD',
    REQUEST_SET_ACTIVE:         'Activar solicitud para hacer operaciones CRUD',
    REQUEST_LOADED:             'Obtener las request del usuario desde la BD',

    UI_OPEN_NEW_REQUEST_MODAL:  'Abrir modal nueva request',
    UI_CLOSE_NEW_REQUEST_MODAL: 'Cerrar modal nueva request'

}