const reviewTypes = {
    RESTAURANT: 'restaurant',
    RAMEN: 'ramen',
} as const;

export const reviewStatuses = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
} as const; 

export type AccountType = typeof reviewTypes[keyof typeof reviewTypes];
export type ReviewStatus = typeof reviewStatuses[keyof typeof reviewStatuses];

export default reviewTypes;