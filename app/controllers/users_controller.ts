import type { HttpContext } from '@adonisjs/core/http'

//agrego modelo USUARIO
import User from '#models/user'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
//De esta manera se muestran todos los usuarios
    return await User.all();
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
   // return params.id;
    //para ver SOLO UNO
    const user = await User.find(params.id)
    // SQL: SELECT * from "users" WHERE "id" = 1 LIMIT 1;
    return user;
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {
     //para ver SOLO UNO
     const user = await User.find(params.id)
     // SQL: SELECT * from "users" WHERE "id" = 1 LIMIT 1;
     return user;
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}