const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  // console.log(req.params);
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "missing name or price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; //converting string into number simple trick
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  //usually mongo cares of the id but here we dont have database so we specify the id.
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
};
