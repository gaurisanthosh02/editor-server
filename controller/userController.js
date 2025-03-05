const jwt = require('jsonwebtoken')
const editors = require('../model/userModel')

exports.upsertDraftController = async (req, res) => {
    console.log("Inside upsertDraftController");
    try {
            
        const {userId, content} = req.body
        console.log(req.body);
        
        if(!userId || !content){
            res.status(400).json("Need UserID and Content")
        }            
        
        // get the update or create draft
        const draft = await editors.findOneAndUpdate({userId}, {content},{new: true, upsert:true});
        console.log(draft);
        return res.status(200).json(draft)
    } 
    catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteDraftController = async (req, res) => {
    console.log("Inside deleteDraftController");
    try {
        const { userId } = req.body;

        await editors.findOneAndDelete({ userId });
        res.status(200).json({ message: "Draft deleted successfully" });
        console.log("Draft Deleted");
    } 
    catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

exports.getDraftController = async (req, res) => {
    console.log("Inside getDrafts");
    try {
        const drafts = await editors.find();
        res.status(200).json(drafts);
    } 
    catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}
