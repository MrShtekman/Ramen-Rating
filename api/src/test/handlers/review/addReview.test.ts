import { Types } from 'mongoose';
import supertest from "supertest";

import app from "../../../app";

import Restaurant from "../../../schemas/Restaurant";

import ramenFactory from "../../../utils/factories/ramenFactory";
import restaurantFactory from "../../../utils/factories/restaurantFactory";

import { mockDbConnect, mockDbDisconnect } from "../../../utils/memorydb";

// beforeAll(async () => await mockDbConnect());
// afterAll(async () => await mockDbDisconnect());

describe("Add Review", () => {
    test.skip("Should add a review to a ramen", async () => {
        const restaurantId = new Types.ObjectId();
        const ramenId = new Types.ObjectId();
        const reviewId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
        }));

        const ramen = ramenFactory({
            _id: ramenId,
            restaurant: restaurantId,
        });

        await supertest(app)
            .post("/main/ramen")
            .send(ramen);

        const review = {
            _id: reviewId,
            target: ramenId,
            type: "ramen",
            rating: 5,
            comment: "Delicious!",
        };

        const response = await supertest(app)
            .post("/main/review")
            .send(review);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Review added successfully");

        const updatedRamen = await Restaurant.findById(ramenId);
    });
    test.skip("Should add a review to a restaurant", async () => {

    });
    test.skip("Should throw error 404 if the targeted ramen is not found", async () => {

    });
    test.skip("Should throw error 404 if the targeted restaurant is not found", async () => {

    });
    test.skip("Should throw error 400 if the review type is invalid", async () => {

    });
})