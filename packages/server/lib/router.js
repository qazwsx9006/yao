const _ = require('lodash')
const fs = require('fs')
const Router = require('koa-joi-router')

const getRouters = (path) => {
  const routers = fs
    .readdirSync(path, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((file) => {
      return loadRoutes(`${path}/${file.name}`, { entryFolder: path })
    })

  return registerRoutes(routers)
}

function loadRoutes(path, { entryFolder }) {
  const routes = fs.readdirSync(`${path}`).map((file) => {
    return require(`${path}/${file}`)
  })

  return _.flatten(routes)
}

function registerRoutes(routes, params = {}) {
  const { prefix, minVersion, maxVersion, versionStep = 1, latest } = params

  const versionRoutes = _.flatten(routes).map((route) => {
    return getVersionRoute(route, { minVersion, maxVersion, versionStep, latest })
  })
  let apiRouter = Router()
  if (prefix) apiRouter.prefix(`/${prefix}`)
  apiRouter.route(versionRoutes)
  return [apiRouter]
}

function getVersionRoute(route, { minVersion, maxVersion, versionStep, latest }) {
  let { version = {} } = route
  if (!isVersionRoute({ version, minVersion, maxVersion })) return route
  const { min = minVersion, max = maxVersion } = version
  if (!_.isArray(version)) version = _.range(min, max + versionStep, versionStep)

  const versionPrefix = version.map((ver) => `v${ver}`)
  const isLatestApi = _.includes(version, maxVersion)
  if (isLatestApi && latest) versionPrefix.unshift(latest)
  route.path = `/(${versionPrefix.join('|')})${route.path}`
  return route
}

function isVersionRoute({ version, minVersion, maxVersion }) {
  if (version === false) return false
  if (_.isEmpty(version) && !minVersion && !maxVersion) return false
  return true
}

module.exports = {
  getRouter: () => Router,
  getRouters,
  loadRoutes,
  registerRoutes,
}
