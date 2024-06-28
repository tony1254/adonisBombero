import { BaseSeeder } from '@adonisjs/lucid/seeders'
//agrego modelo USUARIO
import User from '#models/user'
import Role from '#models/role'


export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
   /* await User.createMany([
      {
        email: 'admin@adonisjs.com',
        password: 'secret',
      },
      {
        email: 'user@adonisjs.com',
        password: 'supersecret',
      },
    ])*/

      const roleUser  = await Role.findBy('name', 'user')
      const roleAdmin  = await Role.findBy('name', 'admin')
      if (!roleUser || !roleAdmin) {
        throw new Error('Roles not found')
      }
  
      const users = [
        {
          email: 'admin@adonisjs.com',
          password: 'secret',
          role: roleAdmin, // Asignar el rol admin
        },
        {
          email: 'user@adonisjs.com',
          password: 'supersecret',
          role: roleUser, // Asignar el rol user
        },
      ]
  
      for (const userData of users) {
        const user = new User()
        user.email = userData.email
        user.password = userData.password
        await user.save()
        // Asociar el rol al usuario
        if (userData.role) {
          await user.related('roles').attach([userData.role.id])
          console.log(`User ${user.email} with role ${userData.role.name} is persisted: ${user.$isPersisted}`)
        } else {
          console.error(`Role not found for user ${user.email}`)
        }
      }
  
  }
}