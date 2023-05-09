const Hapi = require('@hapi/hapi') // eslint-disable-line import/no-extraneous-dependencies
const winston = require('winston') // eslint-disable-line import/no-extraneous-dependencies
const routes = require('./routes')

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
})

const init = async () => {
  const server = Hapi.server({
    port: 5100,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })
  server.route(routes)

  await server.start()
  logger.info(`Server berjalan pada ${server.info.uri}`)
}

init()
