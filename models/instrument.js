import {Schema, model, models} from "mongoose";


//Adding address field as a subdocument
const addressSchema = new Schema({
    streetAddress: { type: String, required: [true, "Street address is required."]}, 
    city: {type: String, required: [true, "City is required."]}, 
    state: {type: String, required: [true, "State is required."]}, 
    postalCode: { type: String, required: [true, "Postal code is required."]}
}); 


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
    address: addressSchema
})

export {InstrumentSchema}; 

const Instrument = models.Instrument || model('Instrument', InstrumentSchema); 


export default Instrument; 
