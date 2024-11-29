import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm'

export class UniqueUserColumns1731752372347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createUniqueConstraint(
      'user',
      new TableUnique({
        name: 'unique_user_columns',
        columnNames: ['email', 'username', 'googleId', 'discordId'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropUniqueConstraint('user', 'unique_user_columns')
  }
}
