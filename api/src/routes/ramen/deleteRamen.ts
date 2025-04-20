import Ramen from '../../schemas/Ramen';

const deleteRamen = async (req, res) => {
    try {
        const { id } = req.params;
        await Ramen.findByIdAndDelete(id);
        res.status(200).json({ message: "succeed!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default deleteRamen;