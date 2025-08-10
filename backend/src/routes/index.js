const express = require('express');
const authRoutes = require('./authRoutes');
const excelRoutes = require('./excelRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/excel', excelRoutes);

module.exports = router;
