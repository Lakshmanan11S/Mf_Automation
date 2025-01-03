const solutionData = (data)=>{
    return{
    type: 'SolutionOriented',
    SchemeName: data[0],
    BenchMark: data[1] || null,
    Riskometer: {
        Scheme: data[2] || null,
        BenchMark: data[3] || null,
    },
    NAV: {
        Date: data[4] || null,
        Regular: data[5] || null,
        Direct: data[6] || null,
    },
    Returns: {
        "1Year": {
            Regular: data[7] || null,
            Direct: data[8] || null,
            BenchMark: data[9] || null,
        },
        "3Year": {
            Regular: data[10] || null,
            Direct: data[11] || null,
            BenchMark: data[12] || null,
        },
        "5Year": {
            Regular: data[13] || null,
            Direct: data[14] || null,
            BenchMark: data[15] || null,
        },
        "10Year": {
            Regular: data[16] || null,
            Direct: data[17] || null,
            BenchMark: data[18] || null,
        },
        SinceLaunch: {
            Regular: data[19] || null,
            Direct: data[20] || null,
            BenchMark: data[21] || null,
        },
    },
    DailyAUMCr: data[22] || null,
}};
module.exports = solutionData