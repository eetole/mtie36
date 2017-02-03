import Service from '../models/service';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

export function getVehicles(req, res) {
  Service.find().sort('-dateAdded').exec((err, services) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ services });
  });
}

export function addService(req, res) {
  if (!req.body.vehicle_cuid || !req.body.mileage || !req.body.date) {
    res.status(403).end();
  }

  const newService = new Service(req.body);

  // Let's sanitize inputs
  newService.vehicle_cuid = sanitizeHtml(newService.vehicle_cuid);
  newService.mileage = sanitizeHtml(newService.mileage);
  newService.date = sanitizeHtml(newService.date);
  newService.description = sanitizeHtml(newService.description);
  newService.responsible = sanitizeHtml(newService.responsible);

  newService.cuid = cuid();

  try {
    newService.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({saved});
    });
  } catch (error){
    console.log(error);
  }
}

export function getService(req, res) {
  Service.findOne({ cuid: req.params.cuid }).exec((err, service) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ service });
  });
}

export function deleteService(req, res) {
  Service.findOne({ cuid: req.params.cuid }).exec((err, service) => {
    if (err) {
      res.status(500).send(err);
    }

    service.remove(() => {
      res.status(200).end();
    });
  });
}
