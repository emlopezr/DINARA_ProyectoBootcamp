import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypesDocuments extends BaseSchema {
  protected tableName = 'types_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)
    })

    this.defer(async () => {
      const types_document=[
        {name: 'cedula de ciudadania', state: true},
        {name: 'cedula de extranjeria', state: true},
        {name: 'pasaporte', state: true},
        {name: 'tarjeta de identidad', state: true}
      ]
      await this.db.table(this.tableName).insert(types_document)
    })

  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
