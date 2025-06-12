import { Types } from 'mongoose';
import supertest from "supertest";

import app from "../../../app";

import Restaurant from "../../../schemas/Restaurant";
import Ramen from "../../../schemas/Ramen";
import RamenReview from '../../../schemas/reviews/RamenReview';
import RestaurantReview from '../../../schemas/reviews/RestaurantReview';

import ramenFactory from "../../../utils/factories/ramenFactory";
import restaurantFactory from "../../../utils/factories/restaurantFactory";
import reviewFactory from '../../../utils/factories/reviewFactory';
import reviewTypes from "../../../constants/reviewTypes";

describe("Add Review", () => {
    let restaurantId: Types.ObjectId;
    let ramenId: Types.ObjectId;
    let reviewId: Types.ObjectId;

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();
        ramenId = new Types.ObjectId();
        reviewId = new Types.ObjectId();
        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
        }));
    });

    test("Should add a review to a ramen", async () => {
        await Ramen.create(ramenFactory({
            _id: ramenId,
            restaurant: restaurantId,
        }));

        const review = reviewFactory(reviewTypes.RAMEN, {
            _id: reviewId,
            subject: ramenId,
        });

        const response = await supertest(app)
            .post("/review")
            .send(review);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Review added successfully");

        const updatedRamen = await Ramen.findById(ramenId);
        if(!updatedRamen) {
            throw new Error("Ramen not found");
        }

        expect(updatedRamen.reviews).toHaveLength(1);
        expect(updatedRamen.reviews[0]).toStrictEqual(reviewId);
    });
    test("Should add a review to a restaurant", async () => {
        const review = reviewFactory(reviewTypes.RESTAURANT, {
            _id: reviewId,
            subject: restaurantId,
        });

        const response = await supertest(app)
            .post("/review")
            .send(review);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Review added successfully");

        const updatedRestaurant = await Restaurant.findById(restaurantId);
        if(!updatedRestaurant) {
            throw new Error("Restaurant not found");
        }

        expect(updatedRestaurant.reviews).toHaveLength(1);
        expect(updatedRestaurant.reviews[0]).toStrictEqual(reviewId);
    });
    test("Should throw error 404 if the targeted ramen is not found", async () => {
        await Ramen.create(ramenFactory({
            _id: ramenId,
            restaurant: restaurantId,
        }));

        const review = reviewFactory(reviewTypes.RAMEN, {
            _id: reviewId,
        });

        const response = await supertest(app)
            .post("/review")
            .send(review);

        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Ramen not found");
    });
    test("Should throw error 404 if the targeted restaurant is not found", async () => {
        const review = reviewFactory(reviewTypes.RESTAURANT, {
            _id: reviewId,
        });

        const response = await supertest(app)
            .post("/review")
            .send(review);

        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant not found");
    });
    test("Should throw error 400 if the review type is invalid", async () => {
        const review = reviewFactory("pizza", {
            _id: reviewId,
        });

        const response = await supertest(app)
            .post("/review")
            .send(review);

        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Invalid review type");
    });
})