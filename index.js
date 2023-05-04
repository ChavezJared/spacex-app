const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  axios.get('https://api.spacexdata.com/v4/company')
    .then(function (response) {
      // handle success
    //   console.log(response.data);
      res.render('index',{company : response.data}) // company.name
    })
    .catch(function(error){
        // console.log(error);
        res.json({message: 'Data not found. Please try again later.'});
    })
});

app.get('/capsules', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
      .then(function (response) {
        // handle success
        // console.log(response.data);
        res.json('capsules',{capsules: response.data})
      })
      .catch(function(error){
          console.log(error);
        //   res.json({message: 'Data not found. Please try again later.'});
      })
  });

// // Scenario 1 - Return a single capsule
// app.get('/capsules/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/capsules')
//         .then(function (response) {
//             // handle success
//             // console.log(response.data);
//             // 
//             for (let i = 0; i < response.data.length; i++) {
//                 let capsule = response.data[i];
//                 let splitSerial = req.params.serial.split(''); // array ['c', '1', ...]
//                 let finalSerial = splitSerial[0].toUpperCase() + splitSerial.slice(1).join('');
//                 // upperCaseSerial[0].toUpperCase()
//                 // upperCaseSerial.join('');
//                 console.log('UpperCase Serial', finalSerial);
//                 // console.log('capsule', capsule); // { serial: 'C101', ...}
//                 if (capsule.serial === finalSerial) {
//                     return res.json({ capsule: capsule });
//                 }
//             }
//             return res.json({ message: 'Capsule does not exist'});
//         })
//         .catch(function (error) {
//             // console.log(error);
//             return res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

app.get('/capsules/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
    .then(function (response) {
        // print req.params
        console.log('req.params', req.params); // print an object
        console.log('api response', response.data); // print an array of capsules
        // run a for loop to search based of the key from req.params
        const capsuleArray = [];
        for (let i = 0; i < response.data.length; i++) {
            let capsule = response.data[i];
            let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
            if (req.params['0'].includes('serial')) {
                if (capsule.serial === userRequest[1].toUpperCase()) {
                    return res.json({ capsule });
                }
            } else if (userRequest[0] === 'id') {
                if (capsule.id === userRequest[1]) {
                    return res.json({ capsule });
                }
            } else if (userRequest[0] === 'reuse_count') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.reuse_count === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'water_landings') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.water_landings === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'land_landings') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.land_landings === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'last_update') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.last_update === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'status') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let value = userRequest[1]; // Number(userRequest[1])
                // check the count value
                if (capsule.status === value) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'type') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let value = userRequest[1]; // Number(userRequest[1])
                // check the count value
                if (capsule.type === value) {
                    capsuleArray.push(capsule);
                }
            } else {
                return res.json({ message: 'Data is not found... Please try again.' });
            }

            // @todo - we need make a conditional for id
            // @todo - we need make a conditional for water_landings
            // @todo - we need make a conditional for last_update
            // @todo - we need make a conditional for status
            // @todo - we need make a conditional for type

        }
        if (capsuleArray.length < 1) {
            return res.json({message: 'Capsule not found, Please try again.'})
        }
        return res.json({ capsules: capsuleArray });
    })
});

    // @todo - we need make a conditional for id
            // @todo - we need make a conditional for water_landings
            // @todo - we need make a conditional for last_update
            // @todo - we need make a conditional for status
            // @todo - we need make a conditional for type
//last update

  app.get('/company', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });


  app.get('/company/:serial', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/cores', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });
  app.get('/cores-data', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/cores-data')
    .then(function (response) {
      // handle success
    //   console.log(response.data);
      res.json('Cores data',{cores : response.data}) // company.name
    })
    .catch(function(error){
        console.log(error);
        // res.json({message: 'Data not found. Please try again later.'});
    })
  });
  app.get('/cores/*', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
      .then(function (response) {
        const coreArray = [];
        for (let i = 0; i <response.data.length; i++) {
            let core = response.date[i];
            let userRequest = req.params['0'].split('/');
            if (userRequest[0] === 'serial') {
                if (core,serial === userRequest[1].toUpperCase()) {
                 return res.json({core});   
                }
            } else if (userRequest [0] === 'id') {
                if (core.id === userRequest[1]) {
                    return res.json({core});
                }
            } else if (userRequest[0] === 'reuse_count') {
                let countValue = parseInt(userRequest[1]);
                if (core.status === 'active' && core.reuse_count === countValue) {
                    coreArray.push(core)
                }
            } else if (userRequest[0] === 'status'){
                let value = userRequest[1];
                if (core.stauts === value) {
                    coreArray.push(core);
                }
            } else if (userRequest[0] === 'launches') {
                let value = userRequest[1];
                if (core.launches.includes(value)) {
                    coreArray.push(core);
                }
            } else {
                return res.json ({message: 'Data is not found... Please try again.'})
            }
        }
        return res.json ({ cores: coreArray})
      })
  });
  
  
  
  
  
     

  app.get('/crews', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/crews-data', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/dragons', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            let dragonArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let dragon = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'id') {
                    if (dragon.id === userRequest[1]) {
                        return res.json({ dragon });
                    }
                } else if (userRequest[0] === 'name') {
                    if (dragon.name.toLowerCase() === userRequest[1].toLowerCase()) {
                        return res.json({ dragon });
                    }
                } else if (userRequest[0] === 'type') {
                    if (dragon.type.toLowerCase() === userRequest[1].toLowerCase()) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'active') {
                    let value = userRequest[1].toLowerCase() === 'true';
                    if (dragon.active === value) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'crew_capacity') {
                    let value = parseInt(userRequest[1]);
                    if (dragon.crew_capacity === value) {
                        dragonArray.push(dragon);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ dragons: dragonArray });
        });
});

  app.get('/landpads', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/landpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            let landpadArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let landpad = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'id') {
                    if (landpad.id === userRequest[1]) {
                        return res.json({ landpad });
                    }
                } else if (userRequest[0] === 'name') {
                    if (landpad.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ landpad });
                    }
                } else if (userRequest[0] === 'status') {
                    if (landpad.status === userRequest[1]) {
                        landpadArray.push(landpad);
                    }
                } else if (userRequest[0] === 'type') {
                    if (landpad.type === userRequest[1]) {
                        landpadArray.push(landpad);
                    }
                } else if (userRequest[0] === 'region') {
                    if (landpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        landpadArray.push(landpad);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ landpads: landpadArray });
        });
});


  app.get('/launches', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });


  app.get('/launches/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            let launchesArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'launchpad') {
                    if (launch.launchpad === userRequest[1]) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'flight_number') {
                    if (launch.flight_number === parseInt(userRequest[1])) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'name') {
                    if (launch.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'date_unix') {
                    if (launch.date_unix === parseInt(userRequest[1])) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'date_precision') {
                    if (launch.date_precision.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchesArray.push(launch);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ launches: launchesArray });
        });
});


  app.get('/launchpads', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/launchpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            let launchpadArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launchpad = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'id') {
                    if (launchpad.id === userRequest[1]) {
                        return res.json({ launchpad });
                    }
                } else if (userRequest[0] === 'status') {
                    if (launchpad.status === userRequest[1]) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'region') {
                    if (launchpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'name') {
                    if (launchpad.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'locality') {
                    if (launchpad.locality.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ launchpads: launchpadArray });
        });
});

  app.get('/payloads', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/roadster', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/rockets', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/ships', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/starlink', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });

  app.get('/history', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
      .then(function (response) {
        // handle success
      //   console.log(response.data);
        res.json({date: response.data})
      })
      .catch(function(error){
          // console.log(error);
          res.json({message: 'Data not found. Please try again later.'});
      })
  });
  app.get("/search", (req, res) => {
    let result = {} ;
    // {name: 'capsules', serial, 'c103}
    // How would we make an axios when the name is different?
    axios.get(`https://api.spacexdata.com/v4/${req.query.item}`)
    .then(function(response) {
        for (let key in req.query){
            if (key === 'item') {
                // do nothing
                continue;
            } else  {
                // run for loop to search for the key and value
                // key -> serial
                // req.query[key] -> c103
                for (let i = 0; i < response.data.length; i++) {
                    let responseValue = response.data[i]
                    if (responseValue.serial === req.query[key]){
                        res.json({responseValue});
                    } else if (responseValue.name === req.query[key] ){
                    return res.json({ responseValue })
                }  else if (responseValue.id === req.query[key] ){
                    return res.json({ responseValue })
                }  else if (responseValue.name === req.query[key] ){
                return res.json({ responseValue })
                } else if (responseValue.company === req.query[key]){
                    responseArray.push(responseValue)
                } else if (responseValue.active.toString() === req.query[key]){
                    responseArray.push(responseValue);
                }
            }
        }
    }

        res.json ({message: 'Data not found. Please try again...'})

    })
    .catch(function(error) {
        // console.log(error)
    res.json ({message: 'Data not found. Please try again later'}) 
    })
    // console.log('Query:', req.query);
    // res.json ({})
});

app.get('/index', function(req, res) {
    res.sendFile(__dirname+'/views/index.html');
  });

  app.get('/about', function(req, res) {
    res.sendFile(__dirname+'/views/about.html');
  });

  app.get('/blog-directory', function(req, res) {
    res.sendFile(__dirname+'/views/blog-directory.html');
  });

  app.get('/:input', function (req, res){
    console.log('REQ.PARAMS ->', req.params);

    res.json({ message: 'Testing /:input'});
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, function (){
    console.log(`Server is running on PORT`, PORT);
});

module.exports = {
    app,
    PORT
  }