const { Schema, model } = require("mongoose");

const bookingSchema = new Schema
    ({
        service: {
            type: String,
            enum: ['boarding', 'dayCare', 'houseVisit', 'grooming'],
        },
        owner: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        pet: [{
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }],
        request: [{
            type: Schema.Types.ObjectId,
            ref: 'Request'
        }],
        startDateTime: Date,    
        endDateTime: Date        
    },
    {
    // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    });

const Booking = model("Booking", bookingSchema);

module.exports = Booking;