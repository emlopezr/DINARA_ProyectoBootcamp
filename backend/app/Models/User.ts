import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: "first_name"})
  public firstName: string

  @column({columnName: "second_name"})
  public secondName: string

  @column({columnName: "first_surname"})
  public surname: string

  @column({columnName: "second_surname"})
  public secondSurName: string

  @column({columnName: "document_number"})
  public documentNumber: number

  @column({columnName: "type_document_id"})
  public typeDocument: number

  @column()
  public email: string

  @column()
  public password: string

  @column({columnName: "role_id"})
  public role: number

  @column()
  public phone: string

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
