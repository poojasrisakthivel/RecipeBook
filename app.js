/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB connection string
const mongoURI = 'mongodb+srv://samplecloud:123@cluster0.bhc3z.mongodb.net/cloud?retryWrites=true&w=majority';
//const mongoURI = 'mongodb+srv://samplecloud:123@cluster0.bhc3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // For static files (CSS, JS)

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
}, { collection: 'recipebook' });

const Recipe = mongoose.model('Recipe', recipeSchema);

// Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Add a recipe
app.post('/add', async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions
  });

  try {
    await newRecipe.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding recipe');
  }
});

// Search a recipe
app.post('/search', async (req, res) => {
    const { name } = req.body;  // Get the recipe name from the request body
    console.log('Searching for recipe:', name);
    try {
        // Use a regex for an exact case-insensitive match
        const recipe = await Recipe.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
        
        if (recipe) {
            // If recipe found, send back the recipe data as JSON
            res.json({
                name: recipe.name,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions
            });
        } else {
            // If no recipe found, send an empty object or message
            res.json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).send('Error searching for recipe.');
    }
});


// Delete a recipe
app.post('/delete', async (req, res) => {
  const { name } = req.body;

  try {
    await Recipe.findOneAndDelete({ name });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting recipe');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB connection string
/*const mongoURI = 'mongodb+srv://samplecloud:123@cluster0.bhc3z.mongodb.net/cloud?retryWrites=true&w=majority';*/


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON requests

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
}, { collection: 'recipebook' });

const Recipe = mongoose.model('Recipe', recipeSchema);

// Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Add Recipe route
app.post('/add', async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions
  });

  try {
    await newRecipe.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding recipe');
  }
});

// Search Recipe route
app.post('/search', async (req, res) => {
  const { name } = req.body;  // Get the recipe name from the request body
  try {
    const recipe = await Recipe.findOne({ name: new RegExp(name, 'i') });  // Case-insensitive search
    if (recipe) {
      // If recipe found, send back the recipe data as JSON
      res.json({
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      });
    } else {
      // If no recipe found, send an error message
      res.json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).send('Error searching for recipe.');
  }
});

// Delete Recipe route
app.post('/delete', async (req, res) => {
  const { name } = req.body;

  try {
    await Recipe.findOneAndDelete({ name });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting recipe');
  }
});

// Start the server
//const port = 3000;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
