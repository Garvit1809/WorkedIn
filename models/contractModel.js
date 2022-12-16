const mongoose = require("mongoose");

const contractModel = mongoose.Schema({
    contractName: {
        type: String,
        required: [true, 'Please specify the contracts name'],
        maxlength: [40, 'A Contract name must have less or equal then 25 characters'],
        minlength: [2, 'A Contract name must have more or equal then 3 characters'],
    },
    projectDescription: {
        type: String,
        required: [true, `Tell us about the project you'll be working on`],
    },
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
            approved: {
                type: Boolean,
                default: false
            },
            denied: {
                type: Boolean,
                default: false
            },
            review: {
                //  ref data --> rating, description, userId, contractId, ratedUserId
                type: Number,
                default: 4.5,
                min: [1, 'Rating must be above 1.0'],
                max: [5, 'Rating must be below 5.0']
            }
        }
    ],
    startDate: {
        type: Date,
        default: Date.now()
    },
    dueDate: {
        type: Date,
        default: Date.now() + 172800000
    },
    prevDueDates: [
        {
            prevDate: {
                type: Date,
                default: Date.now() + 172800000
            },
            delayReason: String
        }
    ],
    status: {
        type: String,
        enum: ['in-progress', 'delayed', 'completed', 'broken'],
        default: 'in-progress'
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    githubLink: {
        type: String,
        default: ''
    },
    liveLink: {
        type: String,
        default: ''
    },
    projectImages: [
        {
            type: String,
            default: ''
        }
    ],
    finishedApprovedBy: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    finishContractInitiated: {
        type: Boolean,
        default: false
    },
},
{ timestamps: true }
)

contractModel.pre(/^find/, function(next) {
    this.populate({
        path: 'team.member',
        select: 'name photo'
    }).populate({
        path: 'lead',
        select: 'name photo'
    })
    next();
});

const Contract = mongoose.model("Contract", contractModel);

module.exports = Contract

// Team Members Details --> Name, Mail, Pic
//  Project Name
// Project About
// Project stack
// Start Date
// Due Date
// roles
// Responsibilities

// on Contract complete --> Project links --> github, deployed version || give other teammates ratings and reviews


//  Contract Initialized --> contract goes to all members --> leader automatically approved, team approves --> show in chat status of approvals --> contract made once everyon accepts