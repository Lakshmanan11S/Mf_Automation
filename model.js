const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    SchemeName: {
        type: String,
        index: true, 
    },
    BenchMark: {
        type: String,
    },
    Riskometer: {
        Scheme: { type: String },
        BenchMark: { type: String },
    },
    NAV: {
        Date: { 
            type: Date,
            index: true, 
        },
        Regular: { type: Number },
        Direct: { type: Number },
    },
    Returns: {
        "1Year": {
            Regular: { type: Number , default: null},
            Direct: { type: Number, default: null },
            BenchMark: { type: Number , default: null},
        },
        "3Year": {
            Regular: { type: Number, default: null },
            Direct: { type: Number , default: null},
            BenchMark: { type: Number, default: null },
        },
        "5Year": {
            Regular: { type: Number , default: null},
            Direct: { type: Number, default: null },
            BenchMark: { type: Number , default: null},
        },
        "10Year": {
            Regular: { type: Number , default: null},
            Direct: { type: Number, default: null },
            BenchMark: { type: Number, default: null },
        },
        SinceLaunch: {
            Regular: { type: Number , default: null},
            Direct: { type: Number , default: null},
            BenchMark: { type: Number, default: null },
        },
    },
    DailyAUMCr: { type: String , default: null},
});


performanceSchema.index({ SchemeName: 1, "NAV.Date": 1 }); 
const result  = new mongoose.model('SchemePerformance',performanceSchema)
module.exports = result
