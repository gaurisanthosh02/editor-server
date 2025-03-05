const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes/router')
require('./dbConnection')
const { google } = require('googleapis');
const authRouter = require('./routes/authRouter')

const editorServer = express()

editorServer.use(cors())
editorServer.use(express.json())
editorServer.use(router)
editorServer.use(authRouter)

const PORT = process.env.PORT || 3000

editorServer.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
})

editorServer.get('/', (req, res) => {
    res.status(200).send(` Editor server running at port ${PORT}`)
})

