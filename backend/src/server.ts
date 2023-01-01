import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import FS from 'fs'

import express from 'express'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import https from 'https'

import passportMiddleware from '@/passport'
import router from '@/route'
import mongodb from '@/mongodb'

const App = express()
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({ extended: true }))
App.use(
  cors({
    origin: [ process.env.FRONTEND_URL || '' ],
    credentials: true,
  }),
)
App.use(
  expressSession({
    secret: 'cardio',
    resave: false,
    saveUninitialized: false,
  }),
)
App.use(passportMiddleware)

App.use(router)

const httpsServer = (app: express.Express) => {
  const privateKey = FS.readFileSync(process.env.PRIVATE_KEY_PATH || '')
  const certificate = FS.readFileSync(process.env.CERTIFICATE_PATH || '')
  return https.createServer({
    key: privateKey,
    cert: certificate,
  }, app)
}

const server = process.env.MODE === 'development' ? App : httpsServer(App)
server.listen(process.env.BACKEND_PORT)
console.log(`Express App listening on port ${process.env.BACKEND_PORT}`)

mongodb()
