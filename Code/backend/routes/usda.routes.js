const express = require('express');

const {
    getUSDASnacks,
    getUSDASnackById,
    searchUSDASnack
} = require('../controllers/usda.controller');

const router = express.Router();

router.get('/snacks', async (req,res, next) => {
    try {
        const snacks = await getUSDASnacks();
        res.json(snacks.data);
    } catch (err) {
        console.log(err)
        res.send(err);
    }
});

router.get('/snacks/:snack_id', async (req, res, next) => {

    const snack_id = req.params.snack_id;

    if(!snack_id) {
        res.status(400);
        res.send("Missing snack_id");
    }

    try {
       const snack = await getUSDASnackById(snack_id)
       res.json(snack.data);
    } catch (err) {
        console.log(err)
        throw err;
    }

});

router.get('/search', async (req,res, next) => {

    const q = req.query.q || "";

    try {
        const snacks = await searchUSDASnack(q);
        res.json(snacks.data);
    } catch (err) {
        console.log(err)
        res.send(err);
    }

});

module.exports = router;