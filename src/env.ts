import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT
const secret = process.env.JWT_SECRET
const mongo_uri = process.env.MONG_URI
const cloud_name=process.env.CLOUD_NAME
const cloud_key = process.env.CLOUD_KEY
const cloud_key_secret=process.env.CLOUD_KEY_SECRET

export {
    port,
    secret,
    mongo_uri,
    cloud_key,
    cloud_key_secret,
    cloud_name
}