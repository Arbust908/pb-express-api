const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    reqTime: req.requestTime,
    data: {
      tours,
    },
  });
};
exports.getTourById = (req, res) => {
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
exports.postTours = (req, res) => {
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
exports.patchTourById = (req, res) => {
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
exports.deleteTourById = (req, res) => {
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
