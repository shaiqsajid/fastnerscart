module.exports = function(app) {

	var companies = require('../controllers/companies.js')
	
	app.get('/api/companies/init', companies.init);
	app.get('/api/companies', companies.findAll);
}