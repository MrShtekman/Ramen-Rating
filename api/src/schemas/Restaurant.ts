import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true,
    },
    ramen: {
        type: [ObjectId],
        required: true,
    },
    reviews: {
        type: [ObjectId],
        required: true,
    },
});

export interface IRestaurant extends mongoose.Document {
    name: string;
    location: string;
    created: Date;
    ramen: mongoose.Types.ObjectId[];
    reviews: mongoose.Types.ObjectId[];
};

export interface IRestaurantModel extends mongoose.Model<IRestaurant> {
}

export default mongoose.model<IRestaurant, IRestaurantModel>('Restaurant', RestaurantSchema);