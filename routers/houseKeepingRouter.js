const express = require("express");
const router = express.Router();
const { addHousekeepingTask, getAllHousekeepingTasks, getHousekeepingTaskById, updateHousekeepingTask, deleteHousekeepingTask } = require("../controllers/houseKeepingController");
const validateHousekeeping = require("../middleWeres/houseKeepingValidations");

router.post("/", validateHousekeeping, addHousekeepingTask);

router.get("/", getAllHousekeepingTasks);

router.get("/:id", getHousekeepingTaskById);

router.put("/:id", validateHousekeeping, updateHousekeepingTask);

router.delete("/:id", deleteHousekeepingTask);

module.exports = router;
