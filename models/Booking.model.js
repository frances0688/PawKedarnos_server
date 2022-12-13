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
        startDateTime: Date,    
        endDateTime: Date        
});

const Booking = model("Booking", bookingSchema);

module.exports = Booking;