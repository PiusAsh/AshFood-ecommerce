export class Review {
    id: number; // Assuming you have a unique identifier for reviews
    foodId: number; // Foreign key referencing the Food table
    userId: number;
    rating: number;
    comment: string;
    postedDate: Date; // Date when the review was posted
    // Add other properties as needed
}
