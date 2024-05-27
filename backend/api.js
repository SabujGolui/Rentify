const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const { json } = require("body-parser");

dotenv.config();

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.post("/userlogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const result = await pool.query(`select "rentifyData".login ($1,$2)`, [
      username,
      password,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

router.post("/usersignup", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, type } = req.body;
    console.log(req.body);
    const result = await pool.query(
      `select "rentifyData".signup ($1,$2,$3,$4,$5,$6)`,
      [first_name, last_name, email, phone, password, type]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

router.post("/getproperty", async (req, res) => {
  try {
    const { seller_id } = req.body;
    console.log(req.body);
    const result = await pool.query(`select "rentifyData".get_property ($1)`, [
      seller_id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

router.post("/getpropertybyid", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    const result = await pool.query(
      `select "rentifyData".get_property_by_id ($1)`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

router.post("/delproperty", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    const result = await pool.query(
      `select "rentifyData".delete_property ($1)`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

router.post("/createproperty", async (req, res) => {
  try {
    const {
      id,
      place,
      area,
      number_of_bed_room,
      bathroom,
      near_by,
      seller_id,
    } = req.body;
    console.log(req.body);
    const result = await pool.query(
      `select "rentifyData".create_update_property ($1,$2,$3,$4,$5,$6,$7)`,
      [id, place, area, number_of_bed_room, bathroom, near_by, seller_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

router.post("/interestedproperty", async (req, res) => {
  try {
    const { interested_buyer, id } = req.body;
    console.log(req.body);
    const result = await pool.query(
      `select "rentifyData".property_interested ($1, $2)`,
      [interested_buyer, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

router.post("/searchroperty", async (req, res) => {
  try {
    const { search_by } = req.body;
    console.log(req.body);
    const result = await pool.query(
      `select "rentifyData".search_property($1)`,
      [search_by]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send(error);
  }
});

module.exports = router;
