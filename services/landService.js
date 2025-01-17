const Land = require("../models/Land");
const User = require("../models/User");

async function createLand(land) {
    const createdLand = new Land(land)
    await createdLand.save()
    return createdLand
}

async function getLandById(landId) {
    const land = await Land.findById(landId)
    const ownerId = land.owner.toString()
    const owner = await User.findById(ownerId)
    const ownerNames = `${owner.first_name} ${owner.last_name}`
    const landInfo = {
        owner_names: ownerNames,
        ...land._doc
    }
    return landInfo
}

async function deleteLand(landId) {
    await Land.findByIdAndDelete(landId);   
}

async function updateLand(landId, land) {
    const existing = await Land.findById(landId);

    existing.name = land.name;
    existing.place = land.place;
    existing.price = land.price;
    existing.size = land.size;
    existing.description = land.description;
    existing.owner = land.owner;
    existing.longitude = land.longitude;
    existing.latitude = land.latitude;

    await existing.save();
    return existing;
}

async function getAllLands() {
    return Land.find({});
  }

module.exports = {
    createLand,
    getLandById,
    deleteLand,
    updateLand,
    getAllLands,
}