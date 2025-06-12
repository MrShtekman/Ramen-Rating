import mongoose from "mongoose";
import { ModelValidators } from "../utils/modelValidator";

const { ObjectId } = mongoose.Schema.Types;

const RamenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurant: {
        type: ObjectId,
        required: true,
        immutable: true,
    },
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true,
    },
    reviews: {
        type: [ObjectId],
    },
    flavor: {
        saltiness: {
            type: Number,
            required: true,
        },
        spiciness: {
            type: Number,
            required: true,
        },
        sweetness: {
            type: Number,
            required: true,
        },
        umami: {
            type: Number,
            required: true,
        },
        bitterness: {
            type: Number,
            required: true,
        },
    },
    components: {
        broth: {
            type: String,
            required: true,
        },
        toppings: {
            type: [String],
            required: true,
        },
        noodles: {
            type: String,
            required: true,
        },
    },
});

export interface IRamen extends mongoose.Document {
    name: string;
    price: number;
    restaurant: mongoose.Types.ObjectId;
    rating: number;
    created: Date;
    reviews: mongoose.Types.ObjectId[];
    flavor?: {
        saltiness: number;
        spiciness: number;
        sweetness: number;
        umami: number;
        bitterness: number;
    };
    components?: {
        broth: string;
        toppings: string[];
        noodles: string;
    };
}


interface IRamenModel extends mongoose.Model<IRamen> {
    mutableFieldsFromCreateRamen: ModelValidators;
}



export default mongoose.model<IRamen, IRamenModel>("Ramen", RamenSchema);