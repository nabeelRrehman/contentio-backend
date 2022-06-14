const {stripe_secret_key} = require('../../Config/Stripe')
const stripe = require('stripe')(stripe_secret_key);
const { createProduct } = require('../../Routes/payment/CreatePlan')
const {saveNewData, getSpecificData} = require('../../Helpers')


const getStripePlans = async (planId) => {

    const plans = await stripe.plans.retrieve(
        planId
    );
    return plans    
}


const createPlan = async (next) => {
    let MonthlyPlan = 'Contentio Monthly Plan'
    let amount = 39
    let plan = await createProduct(MonthlyPlan, MonthlyPlan, amount)
    
    if(plan) {
        let savePlan = {
            planId: plan,
            title: MonthlyPlan,
            amount
        }
        await saveNewData('plan', savePlan)
        next()
    }
}

const syncPlans = async (req, res, next) => {
    
    let getPlansDb = await getSpecificData('plan', { "title": 'Contentio Monthly Plan' })
    
    if(getPlansDb && getPlansDb.planId){
        let planExist = await getStripePlans(getPlansDb.planId)
        
        if(planExist && planExist.id){
            next()
        }else{
            createPlan(next)
        }
    }
    else{
        createPlan(next)
    }
}

module.exports = { syncPlans: syncPlans };