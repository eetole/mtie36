import Vehicle from './models/vehicle';

export default function () {
  Vehicle.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const post1 = new Vehicle({ make: 'Audi', model: 'A4', year: '2007', cuid: 'cikqgkv4q01ck7453ualdn3hd', regNumber: 'KMX-586', comment: 'Ostettu saksasta' });
    const post2 = new Vehicle({ make: 'Audi', model: 'S8', year: '2001', cuid: 'cikqgkv4q01ck7453ualdn3hf', regNumber: 'CGV-868', comment: 'Diplomaatti' });

    Vehicle.create([post1, post2], (error) => {

      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
