const feedBackModel = require("../models/feedBackModel");


const addFeedBack = async (req, res) => {
    try {
        const { guest, rating, comment } = req.body;
        if (!(guest && rating && comment)) {
            return res.status(400).json({ msg: "All Fields Are Required" });
        }

        const createFeedBack = await feedBackModel.create({
            guest,
            rating,
            comment
        });

        return res.status(200).json({ msg: "FeedBack Created Successfully", createFeedBack });
    } catch (error) {
        return res.status(500).json({ msg: "An Error Occured While Creating The FeedBack" });
    }
}

const getFeedBack = async (req, res) => {
    try {
        const feedBacks = await feedBackModel.find({});
        if (!feedBacks) return res.status(404).json({ msg: "No FeedBacks Found" });
        return res.status(200).json({ msg: "FeedBacks Are", feedBacks });

    } catch (error) {
        return res.status(500).json({ msg: "An Error Occur While Finding The FeedBacks" });
    }
}
