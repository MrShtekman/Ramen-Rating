import mongoose, { Types } from 'mongoose';
import supertest from "supertest";
import app from "../app";
import Ramen from "../schemas/Ramen";
import Restaurant from "../schemas/Restaurant";
import { mockDbConnect, mockDbDisconnect } from "../utils/memorydb";

beforeAll(async () => await mockDbConnect());
afterAll(async () => await mockDbDisconnect());

describe("Ramen API", () => {
    const mockRamen = {
        name: "Tonkotsu Ramen",
        price: 15.50,
        restaurant: "6804cbf6e541e2bb9b07d612",
        rating: 4.5,
        reviews: [
        ],
        flavor: {
            saltiness: 3,
            spiciness: 1,
            sweetness: 2,
            umami: 5,
            bitterness: 1
        },
        components: {
            broth: "Pork Bone",
            toppings: ["Chashu Pork", "Soft-boiled Egg", "Green Onion", "Seaweed"],
            noodles: "Thin",
            sauce: "Soy Sauce",
        }
    };
    const mockRestaurant = {
        name: "Afuri Ebisu",
        location: "Ebisu, Tokyo"
    };

    test("Should create a new ramen and gets put in the target restaurant", async () => {
        
        const restaurantResponse = await supertest(app)
        .post("/main/restaurant")
        .send(mockRestaurant);
        expect(restaurantResponse.status).toBe(200);
       
        const response = await supertest(app)
            .post("/main/ramen")
            .send(mockRamen);
        expect(response.status).toBe(200);


    });
});