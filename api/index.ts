import { FastifyPluginAsync } from 'fastify';

const indexRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.all('/echo', async (request, reply) => {
    return {
      headers: request.headers,
      query: request.query,
      body: request.body,
      ip: request.ip,
    };
  });
};
export default indexRoute;
