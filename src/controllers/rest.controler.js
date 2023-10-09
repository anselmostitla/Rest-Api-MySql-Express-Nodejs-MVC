const { pool } = require("../db/initDB");
const { v4: uuidv4 } = require("uuid");
const csvtojson = require('csvtojson')
const {mean, std} = require('mathjs')

const createRestaurant = async (req, res) => {
  try {
    const { rating, name, site, email, phone, street, city, state, lat, lng } = req.body;
    if (!email || !phone) return res.status(400).json("Email or phone were not given");
  
    if (rating < 0 || rating > 4 || !rating) return res.status(400).json("rating... must be between 0 and 4");
  
    const currentId = uuidv4();
    const [rows] = await pool.query(
      "INSERT INTO restaurant(id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES ?",
      [currentId, rating, name, site, email, phone, street, city, state, lat, lng]
    );
  
    if (rows.affectedRows > 0) {
      const [response] = await pool.query("SELECT * FROM restaurant WHERE id = ?", [currentId]);
      return res.status(200).json(response[0]);
    }
  
    res.status(400).json("Unsuccessful operation...");
  } catch (error) {
    res.status(500)
  }
};

const createManyRestaurants = async(req, res) => {
  try {
    const data = await csvtojson().fromFile('restaurantes.csv')
    
    var restaurants = []
    for (var i=0; i<data.length; i++){
      var restaurant = []
      for (key in data[i]){
        restaurant.push(data[i][key])
      }
      restaurants.push(restaurant)
    }
    
    let query = "INSERT INTO restaurant(id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES ?"
    // const values = [data[0].id, data[0].rating, data[0].name, data[0].site, data[0].email, data[0].phone, data[0].street, data[0].city, data[0].state, data[0].lat, data[0].lng]
    // const values1 = [data[1].id, data[1].rating, data[1].name, data[1].site, data[1].email, data[1].phone, data[1].street, data[1].city, data[1].state, data[1].lat, data[1].lng]
    // const [response] = await pool.query(query,[[values, values1]]) 

    const [response] = await pool.query(query, [restaurants])
    if(response.affectedRows == 0) return res.status(400).json("Unsuccessful operation")
    
    res.json("You got it, congratulations!")
  } catch (error) {
    res.status(500)
  }
};

const getOneRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await pool.query("SELECT * FROM restaurant WHERE id = ?", [id]);
  
    if(!response[0]) return res.status(400).json(`NO RESTAURANT WITH id -- ${id} -- `)
    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500)
  }
};

const getAllRestaurants = async (req, res) => {  
  try {
    const query = "SELECT * FROM restaurant"
    const [response] = await pool.query(query);
    res.status(200).json(response);
  } catch (error) {
    res.status(500)
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const {id} = req.params
    const { rating, name, site, email, phone, street, city, state, lat, lng } = req.body;
  
    if(rating) {
      if( rating<0 || rating>4) return res.status(400).json("rating... must be bettween 0 and 4")
    }
  
    let query = 'UPDATE restaurant SET '
    query += 'rating = IFNULL(?,rating), '
    query += 'name = IFNULL(?,name), '
    query += 'site = IFNULL(?,site), '
    query += 'email = IFNULL(?,email), '
    query += 'phone = IFNULL(?,phone), '
    query += 'street = IFNULL(?,street), '
    query += 'city = IFNULL(?,city), '
    query += 'state = IFNULL(?,state), '
    query += 'lat = IFNULL(?,lat), '
    query += 'lng = IFNULL(?,lng) '   //last one with NO comma
    query += 'WHERE id = ?'
  
    const [response] = await pool.query(query, [rating ,name , site, email, phone, street, city, state, lat, lng, id])
  
    if(response.affectedRows == 0) return res.status(400).json(`No restaurant with id = ${id}`)
  
    const [rows] = await pool.query('SELECT * FROM restaurant WHERE id = ?', [id])
  
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(500)
  }
}

const deleteRestaurant = async(req, res) => {
  try {
    const {id} = req.params
    const [rows] = await pool.query('SELECT * FROM restaurant WHERE id = ?', [id])
  
    if(!rows[0]) return res.status(400).json(`No restaurant with id = ${id}`)
    
    const [response] = await pool.query('DELETE FROM restaurant WHERE id = ?', [id])
    if(response.affectedRows == 0) return res.status(400).json("Unsuccess deleting...")
    
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(500)
  }
}

const restaurantStatistics = async(req, res) => {
  try {
    const {latP, lngP, radiusP} = req.params

    const [rows] = await pool.query('SELECT id, rating, lat, lng FROM restaurant')
  
    var ratings = []
    for(var i=0; i<rows.length; i++){
      const row = rows[i]
      const distance = (row.lat - latP)**2 + (row.lng - lngP)**2
      if(distance < radiusP**2) ratings.push(row.rating)
    }
  
    const result = {"count":ratings.length, "avg":mean(ratings), "std":std(ratings)}
    
    res.json(result)
  } catch (error) {
    res.status(500)
  }
}



module.exports = { createRestaurant, getOneRestaurant, getAllRestaurants, updateRestaurant, deleteRestaurant, createManyRestaurants, restaurantStatistics };
