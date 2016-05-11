// Loading the car model
import Car from '../models/car.js';

export default (app, router) => {

 
router.route('/car')
    
    // Post route for creating a car
    
    .post((req, res) => {
      
      if(isNaN(req.body.id) || isNaN(req.body.year)){
        res.json({'Message': 'Only numeric values allowed for id and year'})
      } else{
          Car.create({
            model : req.body.model,
            id : req.body.id,
            make : req.body.make,
            year : req.body.year
          }, (err, car) => {

           if (err)
              res.send(err);

           console.log(`Car created: ${car}`);

            Car.find((err, cars) => {
              if(err)
                res.send(err);
                res.json(cars);
            });
          });
        }
    })
  

   // Get route for getting all cars
   .get((req, res) => {
      
      Car.find((err, car) => {
        if(err)
          res.send(err);

        else
          res.json(car);
      });
    })

 
 router.route('/car/:car_id')
    
   // Get route for finding a particular car by its mongoid
   .get((req, res) => {
      Car.findOne({'_id' : req.params.car_id}, (err, car) => {
        console.log(car);
        if(err)
          res.send(err);

        else
          res.json(car);
      });
    })

    // Put route for updating a car info
    .put((req, res) => {
      
       if(isNaN(req.body.id) || isNaN(req.body.year)){
        res.json({'Message': 'Only numeric values allowed for id and year'})
       } else{
          Car.findOne({
            '_id' : req.params.car_id
            }, (err, car) => {

            if (err)
              res.send(err);

            if (req.body.make)
              car.make = req.body.make;
            if (req.body.model)
              car.model = req.body.model;
            if (req.body.year)
              car.year = req.body.year;

            return car.save((err) => {

              if (err)
                res.send(err);

              return res.send(car);
            });
          });
        }
    })

    // Delete route for deleting a car item
    .delete((req, res) => {

      console.log(`Attempting to delete car with id: ${req.params.car_id}`);

      Car.remove({
        _id : req.params.car_id
      }, (err, car) => {

        if(err)
          res.send(err);

        console.log('Car successfully deleted!');

        Car.find((err, cars) => {
          if(err)
            res.send(err);

          res.json(cars);
        });
      });
    });
};
 