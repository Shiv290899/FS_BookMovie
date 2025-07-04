const router = require('express').Router();
const Theatre = require('../models/theatreModel');


// Add a new theatre
router.post('/add-theatre', async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "New theatre has been added!"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


// Admin - Get all theatres (from all owners)
router.get('/get-all-theatres', async (req, res) => {
    try {
        const allTheatres = await Theatre.find().populate({
            path: 'owner',
            select: '-password'
        });

        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatres
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


// Get theatres owned by a specific user (partner)
router.post('/get-all-theatres-by-owner', async (req, res) => {
    try {
        const allTheatres = await Theatre.find({ owner: req.body.owner });

        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


// Update theatre details
router.put('/update-theatre', async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);

        res.send({
            success: true,
            message: "Theatre has been updated!"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


// Delete a theatre
router.put('/delete-theatre', async (req, res) => {
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId);

        res.send({
            success: true,
            message: "The theatre h
