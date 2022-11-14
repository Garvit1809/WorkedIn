const mongoose = require("mongoose");

const contractModel = mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"  
    },
    team: [
        {
            member: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User" 
            },
            role: String,
            responsibility: String,
            review: {
                type: Number,
                default: 4.5,
                min: [1, 'Rating must be above 1.0'],
                max: [5, 'Rating must be below 5.0']
            },
            extraWork: String
        }
    ],
    startDate: {
        type: Date,
        default: Date.now()
    },
    dueDate: {
        type: Date,
    },
    prevDueDates: [
        {
            prevDate: Date,
            delayReason: String
        }
    ],
    status: {
        type: String,
        enum: ['in-progress', 'delayed', 'pending', 'completed', 'broken'],
        default: 'in-progress'
    },
})


const Contract = mongoose.model("Contract", contractModel);

module.exports = Contract

// Team Members Details --> Name, Mail, Pic
// Start Date
// Due Date
// Responsibilities