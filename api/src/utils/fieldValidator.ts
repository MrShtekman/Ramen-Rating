import mongoose from 'mongoose';

const fieldValidator = (requestFields: Record<string, any>, model: mongoose.Model<any>) => {
    const updateFields = Object.keys(requestFields);
    const invalidFields = updateFields.filter(field => !model.schema.paths[field]);
    return invalidFields;
}

export default fieldValidator;