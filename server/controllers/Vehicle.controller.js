import Vehicle from '../models/vehicle';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

export function getVehicles(req, res) {
  Vehicle.find().sort('-dateAdded').exec((err, vehicles) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ vehicles });
  });
}

export function addVehicle(req, res) {
  if (!req.body.post.make || !req.body.post.model || !req.body.post.year) {
    res.status(403).end();
  }

  const newVehicle = new Vehicle(req.body.post);

  // Let's sanitize inputs
  newVehicle.make = sanitizeHtml(newVehicle.make);
  newVehicle.model = sanitizeHtml(newVehicle.model);
  newVehicle.year = sanitizeHtml(newVehicle.year);
  newVehicle.regNumber = sanitizeHtml(newVehicle.regNumber);
  newVehicle.comment = sanitizeHtml(newVehicle.comment);

  newVehicle.cuid = cuid();

  try {
    newVehicle.save((err, vehicle) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({vehicle});
    });
  } catch (error){
    console.log(error);
  }
}

export function getVehicle(req, res) {
  Vehicle.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

export function deleteVehicle(req, res) {
  Vehicle.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
