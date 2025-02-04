const billingModel = require("../models/billingModel");

const addBillingRecord = async (req, res) => {
    try {
        const billingRecord = await billingModel.create(req.body);
        return res.status(201).json({ msg: "Billing Record Added Successfully", billingRecord });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Creating Billing Record", error: error.message });
    }
};

const getAllBillingRecords = async (req, res) => {
    try {
        const billingRecords = await billingModel.find().populate("reservationId").populate("guestId");
        return res.status(200).json({ billingRecords });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Billing Records", error: error.message });
    }
};

const getBillingRecordById = async (req, res) => {
    try {
        const billingRecord = await billingModel.findById(req.params.id).populate("reservationId").populate("guestId");
        if (!billingRecord) return res.status(404).json({ msg: "Billing Record Not Found" });

        return res.status(200).json({ billingRecord });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Billing Record", error: error.message });
    }
};

const updateBillingRecord = async (req, res) => {
    try {
        const updatedBillingRecord = await billingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBillingRecord) return res.status(404).json({ msg: "Billing Record Not Found" });

        return res.status(200).json({ msg: "Billing Record Updated Successfully", billingRecord: updatedBillingRecord });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Updating Billing Record", error: error.message });
    }
};

const deleteBillingRecord = async (req, res) => {
    try {
        const deletedBillingRecord = await billingModel.findByIdAndDelete(req.params.id);
        if (!deletedBillingRecord) return res.status(404).json({ msg: "Billing Record Not Found" });

        return res.status(200).json({ msg: "Billing Record Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Deleting Billing Record", error: error.message });
    }
};

module.exports = { addBillingRecord, getAllBillingRecords, getBillingRecordById, updateBillingRecord, deleteBillingRecord };
