import { Types } from 'mongoose';
import supertest from "supertest";

import app from "../../../app";

import restaurantFactory from "../../../utils/factories/restaurantFactory";

import { mockDbConnect, mockDbDisconnect } from "../../../utils/memorydb";

beforeAll(async () => await mockDbConnect());
afterAll(async () => await mockDbDisconnect());

describe("Add Restaurant", () => {
    test.skip("Should creat a new restaurant", async () => {
        const restaurantId = new Types.ObjectId();

        const restaurant = restaurantFactory({
            _id: restaurantId,
        });

        const response = await supertest(app)
            .post("/main/restaurant")
            .send(restaurant);
        
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant created successfully");

    })
})