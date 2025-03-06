const express = require('express')
const router = express.Router()
const draftController = require('../controller/userController')
const { google } = require('googleapis');
const { createFileInDrive } = require('../driveService');


// to get drafts
router.get('/drafts/fetch', draftController.getDraftController)

//to update or create drafts
router.post('/drafts', draftController.upsertDraftController);

// to delete drafts
router.delete('/drafts', draftController.deleteDraftController);



router.post('/api/drive/create-file', async (req, res) => {
    try {
      const { userId, fileName, fileContent } = req.body;
      
      if (!userId || !fileName || !fileContent) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required parameters' 
        });
      }
      
      const result = await createFileInDrive(userId, fileName, fileContent);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          fileId: result.fileId,
          message: 'File created successfully'
        });
      } else {
        return res.status(500).json({
          success: false,
          message: result.error
        });
      }
      
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  });
  
  module.exports = router;
