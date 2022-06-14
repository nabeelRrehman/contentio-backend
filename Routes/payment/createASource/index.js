const { stripe_secret_key } = require('../../../Config/Stripe')
const { getSpecificData, updateSpecificData, saveNewData } = require('../../../Helpers');
const { objectsHaveSameKeys } = require('../../../Utils');
const stripe = require('stripe')(stripe_secret_key);


const findOrCreateStripeCustomer = async(dbUser, tokenId) => {
    if (!!dbUser.stripeCustomerId) {
        return stripe.customers
            .createSource(dbUser.stripeCustomerId, { source: tokenId })
            // This Stripe service returns a source object
            .then(newSource => {
                return stripe.customers
                    .update(dbUser.stripeCustomerId, { default_source: newSource.id })
            })
    } else { // First payment
        return stripe.customers.create({
            email: dbUser.email,
            source: tokenId
        })
    }
}

const subscribeCustomerToPlan = async (customerId, myPlan) => {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: myPlan }],
    });
    
    return subscription;
}


const createASource = async (req, res) => {

    let requestBody = ['tokenId', 'last4', 'nameOnCard', 'country', 'zipCode']
    let requestObj = await objectsHaveSameKeys(requestBody, req.body)
    if (!requestObj) res.status(404).send({ status: 404, message: 'Missing parameters' })
    try {
        let { userId } = req
        let user = await getSpecificData('user', '_id', userId)
        if (user && user._id) {
            const { tokenId, last4, nameOnCard, country, zipCode } = requestObj
            let source = await findOrCreateStripeCustomer(user, tokenId)
            let searchQuery = { "_id": userId }
            let obj = {
                customerId: source.id,
                cardId: source.default_source,
                last4,
                user: userId,
                nameOnCard
            }
            let card = await saveNewData('card', obj)
            delete obj.user
            let updateQuery = { "stripeCustomerId": source.id, country, zipCode, "card": card._id }
            let getPlansDb = await getSpecificData('plan', "title", 'Contentio Monthly Plan')
            await subscribeCustomerToPlan(source.id, getPlansDb.planId)
            await updateSpecificData('user', searchQuery, updateQuery)
            res.status(200).send({ status: 200, customer: obj })

        } else {
            res.status(404).send({ status: 404, message: 'User does not exist!' })
        }
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })
    }

}

module.exports = createASource