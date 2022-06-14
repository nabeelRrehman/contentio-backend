const Models = require('../Models');

const getSpecificData = async(modelDb, key, value) => await Models[modelDb].findOne({
    [key]: value
}).exec()

const findByKey = async(modelDb, key, value) => await Models[modelDb].find({
    [key]: value
}).exec()

const findOneBySearch = async(modelDb, searchQuery) => await Models[modelDb].findOne(searchQuery)

const findAll = async(modelDb, searchQuery) => await Models[modelDb].find(searchQuery).sort({ createdAt: -1 })

const pushSpecificData = async(modelDb, updateQuery, setQuery) => await Models[modelDb].update(updateQuery, { "$push": setQuery })

const updateSpecificData = async(modelDb, updateQuery, setQuery) => await Models[modelDb].update(updateQuery, { "$set": setQuery })

const updateDataWithFilters = async(modelDb, updateQuery, setQuery, filterQuery) => await Models[modelDb].update(updateQuery, { "$set": setQuery }, filterQuery)

const removeDataFromArr = async(modelDb, updateQuery, unsetQuery) => await Models[modelDb].update(updateQuery, { "$unset": unsetQuery })

const removeSpecificDataFromArr = async(modelDb, updateQuery, pullQuery) => await Models[modelDb].update(updateQuery, { "$pull": pullQuery })

const removeDataArrWithFilters = async(modelDb, updateQuery, pullQuery, filterQuery) => await Models[modelDb].update(updateQuery, { "$pull": pullQuery }, filterQuery)

const pushIfNotExists = async(modelDb, searchQuery, pushQuery) => await Models[modelDb].update(searchQuery, { "$addToSet": pushQuery })

const getAllData = async(modelDb) => await Models[modelDb].find({})

const saveNewData = async(modelDb, storeObj) => new Models[modelDb](storeObj).save().then((data) => data).catch((err) => err)

const getPopulated = async(modelDb, search, populateQuery) => {
    let searchQuery = search ? search : {}
    return await Models[modelDb].find(searchQuery).sort({ createdAt: -1 }).populate(populateQuery)
}

const getSpecificPopulated = async(modelDb, search, populateQuery) => {
    let searchQuery = search ? search : {}
    return await Models[modelDb].findOne(searchQuery).populate(populateQuery)
}


const getAggregate = async(modelDb, aggregateQuery) => await Models[modelDb].aggregate(aggregateQuery)

const deleteSpecificData = async(modelDb, deleteQuery) => await Models[modelDb].deleteOne(deleteQuery)


module.exports = {
    getSpecificData,
    updateSpecificData,
    saveNewData,
    getAllData,
    findAll,
    findOneBySearch,
    pushIfNotExists,
    getPopulated,
    getSpecificPopulated,
    removeDataArrWithFilters,
    removeDataFromArr,
    getAggregate,
    findByKey,
    deleteSpecificData,
    updateDataWithFilters,
    pushSpecificData,
    removeSpecificDataFromArr
}