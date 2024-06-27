/*ss
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'


// Define La ubicacion del controller "Users"
import UsersController from '#controllers/users_controller'
// Define las rutas para el recurso "Users"
router.resource('users', UsersController)


router.on('/').render('pages/home')

