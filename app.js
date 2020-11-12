const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const apiV1Route = '/api/v1';
// ROUTER
// *** TOURS
// *** Index
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const tourId = req.params.id;
  const tourById = tours.find((tour) => {
    return tour.id == tourId;
  });
  if (!tourById) {
    return res.status(404).json({
      status: 'failed',
      message: 'Not Tour found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tourById,
    },
  });
};

const postTours = (req, res) => {
  //   console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const patchTourById = (req, res) => {
  const tourId = req.params.id;
  const tourById = tours.find((tour) => {
    return tour.id == tourId;
  });
  if (!tourById) {
    return res.status(404).json({
      status: 'failed',
      message: 'Not Tour found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tourById,
    },
  });
};

const deleteTourById = (req, res) => {
  const tourId = req.params.id;
  const tourById = tours.find((tour) => {
    return tour.id == tourId;
  });
  if (!tourById) {
    return res.status(404).json({
      status: 'failed',
      message: 'Not Tour found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get(`/api/v1/tours`, getAllTours);
// // *** Show
// app.get(`/api/v1/tours/:id`, getTourById);
// // *** Post
// app.post(`/api/v1/tours`, postTours);
// // Put para actualizar todos los valores
// // Patch para actualizar solo lo que cambia
// // *** Patch
// app.patch(`/api/v1/tours/:id`, patchTourById);
// // *** Delete
// app.delete(`/api/v1/tours/:id`, deleteTourById);

app.route(`${apiV1Route}/tours`).get(getAllTours).post(postTours);
app
  .route(`${apiV1Route}/tours/:id`)
  .get(getTourById)
  .patch(patchTourById)
  .delete(deleteTourById);

const port = 6969;
app.listen(port, () => {
  console.log(`App en puerto:_${port}...`);
});
