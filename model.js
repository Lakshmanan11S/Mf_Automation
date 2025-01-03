const mongoose = require('mongoose');



const performanceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Equity', 'Debt', 'Hybrid', 'SolutionOriented', 'Other'], 
        required: true, 
    },
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
            type: String,
            index: true, 
        },
        Regular: { type: Number },
        Direct: { type: Number },
    },
    Returns: {
        "7days": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String , default: null},
        },
        "15days": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String , default: null},
        },
        "1Month": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String , default: null},
        },
        "3Month": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String , default: null},
        },
        "6Month": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String , default: null},
        },
        "1Year": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String , default: null},
        },
        "3Year": {
            Regular: { type: String, default: null },
            Direct: { type: String , default: null},
            BenchMark: { type: String, default: null },
        },
        "5Year": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String , default: null},
        },
        "10Year": {
            Regular: { type: String , default: null},
            Direct: { type: String, default: null },
            BenchMark: { type: String, default: null },
        },
        SinceLaunch: {
            Regular: { type: String , default: null},
            Direct: { type: String , default: null},
            BenchMark: { type: String, default: null },
        },
    },
    DailyAUMCr: { type: String , default: null},
},{ timestamps: true },);


performanceSchema.index({ SchemeName: 1, "NAV.Date": 1 }); 
const result  = new mongoose.model('SchemePerformance',performanceSchema)
module.exports = result
