
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const recipe = require('../models/recipe.js');

router.get('/index', async (req, res) => {
  res.render('recipes/index.ejs');
});

router.get('/new', async (req, res) => {
  res.render('recipes/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const user = req.session.user;
    // Create a new Recipe object using req.body
    const newRecipe = new recipe(req.body);
    console.log(req.body);
    newRecipe.owner = user._id
    // Save the new Recipe
    await newRecipe.save();

    // Redirect back to the recipe index view
    res.redirect('recipes/index.ejs');
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.redirect('/');
  }
});

module.exports = router;