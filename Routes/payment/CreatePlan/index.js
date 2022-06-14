const {stripe_secret_key} = require('../../../Config/Stripe')
const stripe = require('stripe')(stripe_secret_key);


const createProduct = async (title, description, price) => {

    const PRODUCT_NAME = title;
    const PRODUCT_TYPE = 'service'
  
    const product = await stripe.products.create({
      name: PRODUCT_NAME,
      type: PRODUCT_TYPE,
    });
  
    return createPlan(description, price, product.id);
  
}
  
  
const createPlan = async (description, price, productId) => {
    const PLAN_NICKNAME = description;
    const PLAN_INTERVAL =  "month";
    const CURRENCY = "usd";
    const PLAN_PRICE = price;
  
    const plan = await stripe.plans.create({
      product: productId,
      nickname: PLAN_NICKNAME,
      currency: CURRENCY,
      interval: PLAN_INTERVAL,
      amount: PLAN_PRICE * 100,
    });
  
    return plan.id;
}


module.exports = {createProduct}