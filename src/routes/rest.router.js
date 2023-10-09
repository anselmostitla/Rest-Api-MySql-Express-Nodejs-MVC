const {Router} = require('express')
const router = Router()

const {createRestaurant, getOneRestaurant, getAllRestaurants, updateRestaurant, deleteRestaurant, createManyRestaurants, restaurantStatistics} = require('../controllers/rest.controler')

router.get('/:id', getOneRestaurant)
router.get('/', getAllRestaurants)
router.get("/restaurants/statistics/:latP/:lngP/:radiusP", restaurantStatistics)

router.post('/', createRestaurant)
router.post('/many', createManyRestaurants)

router.patch('/:id', updateRestaurant)
router.delete('/:id', deleteRestaurant)







module.exports = router