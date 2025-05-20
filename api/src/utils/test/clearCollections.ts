import mongoose from "mongoose"

const removeAllCollections = async (db: mongoose.Mongoose) => {
  const collections = Object.keys(db.connection.collections)
  for (const name of collections) {
    const collection = db.connection.collections[name]
    await collection.deleteMany()
  }
}

export default removeAllCollections;