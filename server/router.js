const express = require("express");
const router = express.Router();
const api = require("./api");
const { Employee } = require("./sqlMap");

router.get("/login", (req, res, next) => {
  api.login(req, res, next);
});

// Buy-table
router.get("/showBuy", (req, res, next) => {
  api.showBuy(req, res, next);
});

router.post("/addBuy", (req, res, next) => {
  api.addBuy(req, res, next);
});

router.post("/deleteBuy", (req, res, next) => {
  api.deleteBuy(req, res, next);
});

router.post("/editBuy", (req, res, next) => {
  api.editBuy(req, res, next);
});

// Employee-table
router.get("/showEmployee", (req, res, next) => {
  api.showEmployee(req, res, next);
});

router.post("/addEmployee", (req, res, next) => {
  api.addEmployee(req, res, next);
});

router.post("/deleteEmployee", (req, res, next) => {
  api.deleteEmployee(req, res, next);
});

router.post("/editEmployee", (req, res, next) => {
  api.editEmployee(req, res, next);
});

// Fruit-table
router.get("/showFruit", (req, res, next) => {
  api.showFruit(req, res, next);
});

router.post("/addFruit", (req, res, next) => {
  api.addFruit(req, res, next);
});

router.post("/deleteFruit", (req, res, next) => {
  api.deleteFruit(req, res, next);
});

router.post("/editFruit", (req, res, next) => {
  api.editFruit(req, res, next);
});

// Member-table
router.get("/showMember", (req, res, next) => {
  api.showMember(req, res, next);
});

router.post("/addMember", (req, res, next) => {
  api.addMember(req, res, next);
});

router.post("/deleteMember", (req, res, next) => {
  api.deleteMember(req, res, next);
});

router.post("/editMember", (req, res, next) => {
  api.editMember(req, res, next);
});

// Sell-table
router.get("/showSell", (req, res, next) => {
  api.showSell(req, res, next);
});

router.post("/addSell", (req, res, next) => {
  api.addSell(req, res, next);
});

router.post("/deleteSell", (req, res, next) => {
  api.deleteSell(req, res, next);
});

router.post("/editSell", (req, res, next) => {
  api.editSell(req, res, next);
});

// User-table
router.get("/showUser", (req, res, next) => {
  api.showUser(req, res, next);
});

router.post("/addUser", (req, res, next) => {
  api.addUser(req, res, next);
});

router.post("/deleteUser", (req, res, next) => {
  api.deleteUser(req, res, next);
});

router.post("/editUser", (req, res, next) => {
  api.editUser(req, res, next);
});

module.exports = router;
