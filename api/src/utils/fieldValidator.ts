import mongoose from 'mongoose';

const fieldValidator = (requestFields: Record<string, any>, model: mongoose.Model<any>, checkImmutable: boolean = false) => {
    const updateFields = collectFields(requestFields);
    const invalidFields = updateFields.filter(field => {
        const invalidFieldName = !model.schema.paths[field];
        const isImmutable = model.schema.paths[field]?.options?.immutable && checkImmutable;
        return invalidFieldName || isImmutable;
    });
    return invalidFields;
}

const collectFields = (obj: any, prefix = ''): string[] => {
    let fields: string[] = [];
    for (const key in obj) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            fields = fields.concat(collectFields(obj[key], path));
        } else {
            fields.push(path);
        }
    }
    return fields;
};

export default fieldValidator;