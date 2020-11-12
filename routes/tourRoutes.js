const express = require('express');
const router = express.Router();
const {
  getAllTours,
  postTours,
  getTourById,
  patchTourById,
  deleteTourById,
} = require('../controllers/tourController');

router.route(`/`).get(getAllTours).post(postTours);
router
  .route(`/:id`)
  .get(getTourById)
  .patch(patchTourById)
  .delete(deleteTourById);

module.exports = router;
