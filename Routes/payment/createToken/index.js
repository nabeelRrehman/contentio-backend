const express = require('express');
const { stripe_secret_key } = require('../../../Config/Stripe');
const { objectsHaveSameKeys } = require('../../../Utils');
const stripe = require('stripe')(stripe_secret_key);


const createToken = async(req, res) => {

    let requestBody = ['card_number', 'exp_month', 'exp_year', 'cvc']
    let requestObj = await objectsHaveSameKeys(requestBody, req.body)
    if (!requestObj) res.status(404).send({ status: 404, message: 'Missing parameters' })
    try {
        const { card_number, exp_month, exp_year, cvc } = requestObj
        const token = await stripe.tokens.create({
            card: {
                number: card_number,
                exp_month: exp_month,
                exp_year: exp_year,
                cvc: cvc,
            },
        });
        res.status(200).send({ status: 200, token })
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })
    }

}


module.exports = createToken