import Ramen from '../../schemas/Ramen';

const getObjects = async (req, res) => {
    try {
        const objects = await Ramen.find(req.body);
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getObjects;