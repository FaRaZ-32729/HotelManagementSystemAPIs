const express = require("express");
const router = express.Router();
const { addBillingRecord, getAllBillingRecords, getBillingRecordById, updateBillingRecord, deleteBillingRecord } = require("../controllers/billingControllers");
const validateBilling = require("../middleWeres/billingValidation");

router.post("/", validateBilling, addBillingRecord);

router.get("/", getAllBillingRecords);

router.get("/:id", getBillingRecordById);

router.put("/:id", validateBilling, updateBillingRecord);

router.delete("/:id", deleteBillingRecord);

module.exports = router;