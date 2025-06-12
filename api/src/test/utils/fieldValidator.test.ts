import fieldValidator from "../../utils/fieldValidator";

import Ramen from "../../schemas/Ramen";

describe("Field validator", () => {
    test("Should return empty array when the request body contains only valid fields", async () => {
        const requestBody = {
            name: "Muda muda Ramen",
            price: 15.50,
            rating: 4.5,
            flavor: {
                saltiness: 3,
                spiciness: 2,
                sweetness: 1,
                umami: 4,
                bitterness: 5,
            },
        }
        const invalidFields = fieldValidator(requestBody, Ramen);
        expect(invalidFields).toHaveLength(0);
    });
    test("Should return an array of invalid fields when request body contains invalid fields", async () => {
        const requestBody = {
            name: "Muda muda Ramen",
            price: 15.50,
            restaurant: "6808dd0a731bd96d957cc01b",
            rating: 4.5,
            invalidFields: "This field should not be here",
            anotherInvalidField: "This field should also not be here",
        }
        const invalidFields = fieldValidator(requestBody, Ramen);
        expect(invalidFields).toHaveLength(2);
        expect(invalidFields).toStrictEqual(["invalidFields", "anotherInvalidField"]);
    });
    test("Should return an array when request body contains immutable fields", async () => {
        const requestBody = {
            name: "Muda muda Ramen",
            price: 15.50,
            rating: 4.5,
            restaurant: "6808dd0a731bd96d957cc01b",
        }
        const invalidFields = fieldValidator(requestBody, Ramen, true);
        expect(invalidFields).toHaveLength(1);
        expect(invalidFields).toStrictEqual(["restaurant"]);
    });
    test("Should return an array when request body contains invalid nested objects", async () => {
        const requestBody = {
            name: "Muda muda Ramen",
            price: 15.50,
            rating: 4.5,
            invalidFields: "This field should not be here",
            flavor: {
                saltiness: 3,
                spiciness: 2,
                sweetness: 1,
                umami: 4,
                bitterness: 5,
                invalidness: 100,
            },
        }
        const invalidFields = fieldValidator(requestBody, Ramen);
        expect(invalidFields).toHaveLength(2);
        expect(invalidFields).toStrictEqual(["invalidFields", "flavor.invalidness"]);
    });
});