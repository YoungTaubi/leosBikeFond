const Donation = require("../models/Donation");
// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node')

const router = require("express").Router();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/make-donation", (req, res, next) => {
  const amount = req.body.amount
  console.log(amount);
  Donation.create({ amount: amount })
    .then(createdDonation => {
      res.status(201).json(createdDonation)
    })
    .catch(err => next(err))
});


router.get("/donations", (req, res, next) => {
  Donation.find()
    .then(donations => {
      res.status(200).json(donations);
    })
    .catch(err => next(err))
});

router.get("/praise-the-lord", (req, res, next) => {
  spotifyApi.getTrack('7jQkiAaa4XYYsPH3rcfcWo')
    .then(track => {
      res.status(200).json(track);
    })
    .catch(err => next(err))
});

module.exports = router;
