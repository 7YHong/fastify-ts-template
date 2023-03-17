import fp from 'fastify-plugin';
import knex, { Knex } from 'knex';

const DECORATOR_NAME = 'knex';

export default fp(async (fastify, opts): Promise<void> => {
  const k = knex({
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT) | 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_NAME,
      charset: 'utf8mb4',
    },
  });
  fastify.decorate(DECORATOR_NAME, k);
  fastify.addHook('onClose', (instance, done) => {
    if (instance.hasDecorator(DECORATOR_NAME)) {
      instance.knex.destroy();
    }
    done();
  });
});
declare module 'fastify' {
  export interface FastifyInstance {
    knex: Knex;
  }
}
