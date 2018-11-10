const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    _client: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    _doctor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: ObjectId("5be4e61e6822f694724b9282")
    },
    date: {
        type: Date,
        require: true
    },
    description: {
        type: String
    },
    cost: {
        type: Number
    }
}, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

module.exports = mongoose.model("Appointment", appointmentSchema);