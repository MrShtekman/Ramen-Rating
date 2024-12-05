import TestObject from "../schemas/TestObject.js";

export const addObjects = async (req, res) => {
    try {
        const product = await TestObject.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

export const getObjects = async (req, res) => {
    try {
        const objects = await TestObject.find(req.body);
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getObject = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await TestObject.findById(id);
        res.status(200).json(object);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateObject = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await TestObject.findByIdAndUpdate(id, req.body);
        if (!object) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedObject = await TestObject.findById(id);
        res.status(200).json(updatedObject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteObject = async (req, res) => {
    try {
        const { id } = req.params;
        await TestObject.findByIdAndDelete(id);
        res.status(200).json({ message: "succeed!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default addObjects;