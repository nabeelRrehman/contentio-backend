const { stripe_secret_key } = require('../../../Config/Stripe');
const { findOneBySearch, updateSpecificData } = require('../../../Helpers');
const stripe = require('stripe')(stripe_secret_key);



const findOrCreateStripeCustomer = async(dbUser, tokenId) => {
    if (!!dbUser.customerId) {
        return stripe.customers
            .createSource(dbUser.customerId, { source: tokenId })
            // This Stripe service returns a source object
            .then(newSource => {
                return stripe.customers
                    .update(dbUser.customerId, { default_source: newSource.id })
            })
    } else { // First payment
        return stripe.customers.create({
            email: dbUser.email,
            source: tokenId
        })
    }
}


const updateCustomer = async (req, res) => {

    let { userId } = req
    let { tokenId, nameOnCard } = req.body
    let customer = await findOneBySearch('user', { "_id": userId })
    
    if(customer && customer.card && customer.card.length) {
        try{
        
            const { card } = customer
            const getCard = await findOneBySearch('card', { "_id": card[0] })
            let updateCustomer = await findOrCreateStripeCustomer(getCard, tokenId)
            const updateCard = await stripe.customers.updateSource(
                updateCustomer.id,
                updateCustomer.default_source,
            ); 
            let searchQuery = { "_id": card[0] }
            let updateQuery = { 
                "nameOnCard": nameOnCard, 
                "last4": updateCard.last4,
                "customerId": updateCard.customer,
                "cardId": updateCard.id
            }

            let update = await updateSpecificData('card', searchQuery, updateQuery)
            res.status(200).send({ status: 200, message: "Card has been successfully Updated!" })


        }catch(e) {
            res.status(400).send({ status: 400, message: e.message })
        }

    } else { 
        res.status(404).send({ status: 404, message: 'User not found!' })
    }

}


module.exports = updateCustomer