const questionRoutes = require('./question/questionRoutes')
const testRoutes = require('./test/testRoutes')
const authRoutes = require('./auth/authRoutes')
// route protect.
const { protect: protectRoute } = require('./auth/authController')

// express routes.
const routerInit = app => {
  app.use('/api/v1/questions/', protectRoute, questionRoutes);
  app.use('/api/v1/tests/', protectRoute, testRoutes);
  app.use('/api/v1/auth/', authRoutes);
}

module.exports = routerInit;

