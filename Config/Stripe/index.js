require('dotenv').config()

module.exports = {
    stripe_Api_key: process.env.STRIPE_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET,
}