
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const recipe = require('../models/recipe.js');

router.get('/index', async (req, res) => {
  try {
    // Fetch the user from the session
    const user = req.session.user;

    // Look up the current user's recipes
    const recipes = await recipe.find({ owner: user._id });

    // Send all recipes to the view 
    res.locals.recipes = recipes;
    res.render('recipes/index.ejs');


  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.redirect('/');
  }
  
});

router.get('/new', async (req, res) => {
  res.render('recipes/new.ejs');
});


router.get('/:recipeId/show' , async (req,res) => {
  res.render('recipes/show.ejs')
})

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