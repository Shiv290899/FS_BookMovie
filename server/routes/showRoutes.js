const router = require('express').Router();
const Show = require('../models/showModel');


// Add a new show
router.post('/add-show', async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({
            success: true,
            message: 'New show has been added successfully!'
        });
    } catch (err) {
        res.send({
            status: false,
            message: err.message
        });
    }
});


// Get all shows by theatre ID
router.post('/get-all-shows-by-theatre', async (req, res) => {
    try {
        const shows = await Show.find({ theatre: req.body.theatreId }).populate('movie');
        res.send({
            success: true,
            message: "All shows fetched successfully!",
            data: shows
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


// Delete a show by ID
router.post('/delete-show', async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.body.showId);
        res.send({
