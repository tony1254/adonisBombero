import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
  //relaciones 
  import Role from '#models/role'
  import type { ManyToMany  } from '@adonisjs/lucid/types/relations'
  import { BaseModel, column, manyToMany  } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  ///importante tiene q ir en plural con S
  @manyToMany(() => Role)
  declare roles: ManyToMany<typeof Role>

  /*
  // esta es la relacion
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
*/
}