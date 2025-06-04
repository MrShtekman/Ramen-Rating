import { Types } from 'mongoose';
import supertest from "supertest";

import app from "../../../app";

import Restaurant from "../../../schemas/Restaurant";
import Ramen from "../../../schemas/Ramen";

import ramenFactory from "../../../utils/factories/ramenFactory";
import restaurantFactory from "../../../utils/factories/restaurantFactory";

describe("Add Ramen", () => {
    let restaurantId: Types.ObjectId;
    let ramenId: Types.ObjectId;

    beforeEach(async () => {
        restaurantId = new Types.ObjectId();
        ramenId = new Types.ObjectId();
    
        await Restaurant.create(restaurantFactory({
            _id: restaurantId,
        }));
    });

    test("Should create a new ramen and gets put in the target restaurant", async () => {
        const ramen = ramenFactory({
            _id: ramenId,
            restaurant: restaurantId,
        });

        const response = await supertest(app)
            .post("/ramen")
            .send(ramen);
            
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Ramen added successfully");
        
        const createdRamen = await Ramen.findById(ramenId);
        if(!createdRamen){
            throw new Error("Ramen not created");
        }
        expect(createdRamen.restaurant).toStrictEqual(restaurantId);

        const updatedRestaurant = await Restaurant.findById(restaurantId);
        if (!updatedRestaurant) {
            throw new Error("Restaurant not found");
        }
        expect(updatedRestaurant.ramen).toHaveLength(1);
        expect(updatedRestaurant.ramen[0]).toStrictEqual(ramenId);
    });
    test.skip("Should throw error 400 if the restaurant ID is invalid", async () => {
        const invalidRestaurantId = "Look at me, I'm not a valid ID!";
        const ramenId = new Types.ObjectId();

        await Restaurant.create(restaurantFactory({
            _id: invalidRestaurantId,
        }));

        const ramen = ramenFactory({
            _id: ramenId,
            restaurant: invalidRestaurantId,
        });
   
        const response = await supertest(app)
            .post("/ramen")
            .send(ramen);
            
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Invalid restaurant ID");
    });
    test("should throw error 404 if the targeted restaurant does not exist", async () => {
        const ramen = ramenFactory({
            _id: ramenId,
        });

        const response = await supertest(app)
            .post("/ramen")
            .send(ramen);
            
        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe("Restaurant not found");
    });
});