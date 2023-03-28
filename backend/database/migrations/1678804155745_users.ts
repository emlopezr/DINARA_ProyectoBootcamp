import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 30).notNullable()
      table.string('second_name', 30).notNullable()
      table.string('first_surname', 30).notNullable()
      table.string('second_surname', 30).notNullable()
      table.string('document_number').notNullable().unique()
      table.integer('type_document_id').references('id').inTable('types_documents').onDelete('CASCADE')
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.integer('role_id').references('id').inTable('roles').onDelete('CASCADE')
      table.string('phone', 20).notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
