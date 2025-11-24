
const router = require ('express').Router()
const { request, response } = require('express')
const recipes = require('../../../data/recipes.json')

// Returns all recipes in the database
router.get('/', (_, response) => {
    const summary = recipes.map(recipe => {
        const { id, title, image, prepTime, difficulty } = recipe
        return { id, title, image, prepTime, difficulty }
    })

    response.send(summary)
})

// Creates new recipe and adds it to the list
router.post('/recipe/add', (request, response) => {
    const id = recipes.length + 1
    const recipe = request.body
    const newRecipe = { id, ...recipe }
    recipes.push(newRecipe)
    response.send(newRecipe)
})

// Returns full recipe object of specified id
router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(recipe => recipe.id.toString() === id)
    if (found) {
        return response.send(found)
    }
    response.status(400).send({ error : `Couldn't find recipe ${id}` })
})


module.exports = router
