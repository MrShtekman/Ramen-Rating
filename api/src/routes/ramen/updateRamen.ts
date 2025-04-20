import Ramen from '../../schemas/Ramen';

const updateRamen = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await Ramen.findByIdAndUpdate(id, req.body);
        if (!object) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedRamen = await Ramen.findById(id);
        res.status(200).json(updatedRamen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default updateRamen;