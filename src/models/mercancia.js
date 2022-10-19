import { Schema, model } from 'mongoose';

const mercanciaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
    },
    imgurl:{
        type: String,
        required:true,
        unique:true,
        trim: true,
    },
    stock: {
        type: Boolean,
        default:true,
    },
},{
    timestamps: true,
    versionKey: false,
});

export default model('Mercancia', mercanciaSchema);