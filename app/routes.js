// Loading carRoutes for CRUD operations
import carRoutes from './routes/car_routes.js';

export default (app, router) => {
	
	// Pass in instances of the express app and router
	carRoutes(app, router);
	
	// All of our routes will be prefixed with /api
	app.use('/api', router);
};