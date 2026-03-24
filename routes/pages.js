const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

router.get('/', pagesController.index);
router.get('/about', pagesController.about);
router.get('/services', pagesController.services);
router.get('/projects', pagesController.projects);
router.get('/contact', pagesController.contact);

module.exports = router;