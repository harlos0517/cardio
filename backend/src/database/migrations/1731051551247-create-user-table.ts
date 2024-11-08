import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1731051551247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'username',
          type: 'varchar',
          length: '63',
        },
        {
          name: 'encryptedPassword',
          type: 'varchar',
        },
        {
          name: 'googleId',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'discordId',
          type: 'varchar',
          isNullable: true,
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
