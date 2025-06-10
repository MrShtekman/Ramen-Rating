
const reviewTypes = {
    RESTAURANT: 'restaurant',
    RAMEN: 'ramen',
} as const;

export const reviewStatuses = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
} as const; 

export default reviewTypes;