const { Schema, model } = require("mongoose");

const requestSchema = new Schema
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
        endDateTime: Date,
        isDeclined: {
            type: Boolean,
            default: false,
        }
        
    },
    {
    // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    });

const Request = model("Request", requestSchema);

module.exports = Request;