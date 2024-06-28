import { BaseSeeder } from '@adonisjs/lucid/seeders'

//agrega el MOdleo para CREAR
import Role from '#models/role'


export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    let role = new Role()
    // Assign username and email
    role.name = 'admin'
    role.description = 'Administrador'
    // Insert to the database
    await role.save()
    console.log(`Role ${role.name} is persisted: ${role.$isPersisted}`) // true
    role = await new Role()
    // Assign username and email
    role.name = 'user'
    role.description = 'Usuario'
    // Insert to the database
    await role.save()
    console.log(`Role ${role.name} is persisted: ${role.$isPersisted}`) // true

  }
}