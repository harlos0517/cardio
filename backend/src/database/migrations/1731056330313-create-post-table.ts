import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePostTable1731056330313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'post',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'userId',
          type: 'int',
        },
      ],
    }))
    await queryRunner.createForeignKey('post', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post')
  }
}
