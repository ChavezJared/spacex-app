const request = require('supertest')
const { app, PORT } = require('../index')
const axios = require('axios')

describe('PORT', () => {
    it('PORT is a number', () => {
        expect(typeof PORT).toBe('number');
    });

    it('PORT is 8000 on development', () => {
        expect(PORT).toBe(8000);
    });
});

describe('GET /', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /capsules', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/capsules')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/capsules')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



describe('GET /company', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/company')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/company')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



describe('GET /cores', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/cores')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/cores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



// describe('GET /crew', () => {
//     it('respond with 200', (done) => {
//         request(app)
//             .get('/crew')
//             .expect(200, done);
//     })
    
//     it('should respond with json', (done) => {
//         request(app)
//             .get('/crew')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     })
// });

// describe('GET /cores', () => {
//     it('respond with 200', (done) => {
//         request(app)
//             .get('/cores')
//             .expect(200, done);
//     });
    
//     it('should respond with json', (done) => {
//         request(app)
//             .get('/cores')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });

describe('GET /crew', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/crew')
            .expect(200, done);
    })
    
    it('should respond with json', (done) => {
        request(app)
            .get('/crew')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
});

describe('GET /dragons', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/dragons')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/dragons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



describe('GET /history', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/history')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/history')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /landpads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/landpads')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/landpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const launchpadsData = response.data
            launchpadsData.forEach(launchpad => {
                console.log(launchpad)
            }); res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});




describe('GET /launches', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launches')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



describe('GET /payloads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/payloads')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/payloads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /roadster', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/roadster')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/roadster')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /rockets', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/rockets')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/rockets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /ships', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/ships')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/ships')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /starlink', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/starlink')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/starlink')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
// app.get("/search", (req, res) => {
//     let result = {} ;
//     // {name: 'capsules', serial, 'c103}
//     // How would we make an axios when the name is different?
//     axios.get(`https://api.spacexdata.com/v4/${req.query.name}`)
//     .then(function(response){
//         for (let key in req.query){
//             if (key === 'name') {
//                 // do nothing
//                 continue;
//             } else  {
//                 // run for loop to search for the key and value
//                 // key -> serial
//                 // req.query[key] -> c103
//                 for (let i = 0; i < response.data.length; i++) {
//                     let capsule = response.data[i]
//                     if (capsule.serial === req.query[key])
//                     res.json({capsule});
//                 }
//             }
//         }
//         res.json ({message: 'Data not found. Please try again...'})

//     })
//     .catch(function(error) {
//         // console.log(error)
//     res.json ({message: 'Data not found. Please try again later'}) 
//     })
//     // console.log('Query:', req.query);
//     // res.json ({})
// });
