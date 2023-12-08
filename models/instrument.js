import {Schema, model, models} from "mongoose";


const InstrumentSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    title: {
        type: String,
        required: [true, "Name required."],
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [1, "Price must be more than $1."],
    },
    description: {
        type: String,
        required: [true, "Description required."],
    },
    image: {
        type: String,
        required: [true, "Image required."],
    },
})


const Instrument = models.Instrument || model('Instrument', InstrumentSchema); 


export default Instrument; 
