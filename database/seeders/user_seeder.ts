import { BaseSeeder } from '@adonisjs/lucid/seeders'
//agrego modelo USUARIO
import User from '#models/user'


export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'admin@adonisjs.com',
        password: 'secret',
      },
      {
        email: 'user@adonisjs.com',
        password: 'supersecret',
      },
    ])
  
  }
}