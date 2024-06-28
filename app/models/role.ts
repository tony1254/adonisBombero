import { DateTime } from 'luxon'
  //relaciones 
  import User from '#models/user'
  import type { BelongsTo } from '@adonisjs/lucid/types/relations'
  import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  //agregar las columnas
  @column()
  declare name: string
  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


// esta es la relacion
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}