import Ramen from '../../schemas/Ramen';

const getRamen = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await Ramen.findById(id);
        res.status(200).json(object);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getRamen;