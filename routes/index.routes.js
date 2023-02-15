const Donation = require("../models/Donation");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/make-donation", (req, res, next) => {
  Donation.create({amount: 15})
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

module.exports = router;