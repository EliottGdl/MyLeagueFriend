const express = require('express');
const path = require('path');
let ap = require ("./conf.js");

const { Kayn, REGIONS } = require('kayn')
const kayn = Kayn(ap.api)({
    region: REGIONS.EUROPE_WEST,
    apiURLPrefix: 'https://%s.api.riotgames.com',
    locale: 'en_US',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false,
    },
    cacheOptions: {
        cache: null,
        timeToLives: {
            useDefault: false,
            byGroup: {},
            byMethod: {},
        },
    },
})

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get("/champion", function(req, res, next) {
    
    const main = async () => {
        try {

        const res1 = await kayn.DDragon.Champion.listDataById();
        //req.query.champ);

        res.send(res1);

        } catch (err) {
            res.send("error");
        }
    }
    
    main();

});

app.get("/current", function(req, res, next) {
    
    const main = async () => {
        try {

        const res1 = await kayn.CurrentGame.by.summonerID(req.query.username);

        res.send(res1);

        } catch (err) {
            res.send("error");
        }
    }
    
    main();


}); 

app.get("/profile", function(req, res, next) {
    
    const main = async () => {
        try {

        const res1 = await kayn.Summoner.by.name(req.query.username);

        res.send(res1);

        } catch (err) {
            let envoi = err.error.message.indexOf("403") != -1 ? "apiK" : "error";
      res.send(envoi);
        }
    }
    
    main();


}); 

app.get("/rank", function (req, res, next) {
    const main = async () => {
      try {
        const res2 = await kayn.League.Entries.by.summonerID(req.query.id);
        
        res.send(res2);
      } catch (err) {
  
        let envoi = err.error.message.indexOf("403") != -1 ? "apiK" : "error";
        res.send(envoi);
      }
    };
  
    main();

});


const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Password generator listening on ${port}`);