// const puppeteer = require('puppeteer');
// const categories = require('./category')
// const fs = require('fs');
// const path = require('path');
// const xlsx = require('xlsx');
// const Performance = require('./model')
// const promisify = require("util").promisify;
// const unlinkFile = promisify(fs.unlink);


// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// exports.getAll = async (req, res) => {
//     let browser;
//     try {
//         browser = await puppeteer.launch({
//             headless: false,

//         })
//         const page = await browser.newPage();
//         await page.setViewport({ width: 1250, height: 850 });
//         await page.goto('https://www.amfiindia.com/');
//         await sleep(5000);
//         await page.click('.grid_3.omega')
//         await sleep(5000);
//         await page.click('.nav-box.last')
//         await sleep(5000);
//         await page.click('ul.otherdata > li:nth-child(5) > a');
//         await sleep(8000);
//         const allFrame = await page.frames()
//         const fundPerformanceFrame = allFrame.find(frame => frame.url().includes('valueresearchonline.com'))
//         if (fundPerformanceFrame) {
//             const downloadPath = path.join(__dirname, 'downloads')
//             if (!fs.existsSync(downloadPath)) {
//                 fs.mkdirSync(downloadPath);
//             }
//             await page._client().send('Page.setDownloadBehavior', {
//                 behavior: 'allow',
//                 downloadPath: downloadPath,
//             });

//             //Equity
//             for (const category of categories.equityCategories) {
//                 await fundPerformanceFrame.select('#end-type', '1');
//                 await fundPerformanceFrame.select('#primary-category', 'SEQ');
//                 await fundPerformanceFrame.select('#category', category.value);
//                 await fundPerformanceFrame.select('#amc', 'ALL');
//                 await sleep(3000);
//                 await fundPerformanceFrame.click('.btn.btn-primary.amfi-btn');
//                 await sleep(5000);
//                 await fundPerformanceFrame.click('a#download-report-excel small');
//                 await sleep(3000);
//                 const files = fs.readdirSync(downloadPath);
//                 const downloadedFile = files.find(file => file.endsWith('.xls'));
//                 if (downloadedFile) {
//                     const oldFilePath = path.join(downloadPath, downloadedFile);
//                     const newFilePath = path.join(downloadPath, `Equity_${category.name}.xls`);
//                     fs.renameSync(oldFilePath, newFilePath);
//                     console.log(`File renamed to: ${newFilePath}`);

//                     const workbook = await xlsx.readFile(newFilePath)
//                     const sheetName = workbook.SheetNames[0]
//                     const workSheet = workbook.Sheets[sheetName]

//                     const range = workSheet['!ref']; 
//                     if (range) {
//                         const [start, end] = range.split(':'); 
//                         const lastRow = parseInt(end.replace(/[^\d]/g, '')); 
//                         console.log("Total rows: ", lastRow);
                 
//                     const startRow = 7
//                     for (let rowNumber = startRow; rowNumber <= lastRow; rowNumber++) {
//                         const data = []
//                         for (let col = 1; col <= 23; col++) {
//                             const cellAddress = xlsx.utils.encode_cell({ r: rowNumber - 1, c: col - 1 });
//                             const cell = workSheet[cellAddress];
//                             data.push(cell ? cell.v : null);
//                         }

//                         const isRowEmptyExceptFirstColumn = data.slice(1).every((value) => value === null);
//                         if (isRowEmptyExceptFirstColumn) {
//                             console.log(`Row ${rowNumber} skipped: Only column 1 has data.`);
//                             return;
//                         }



//                         const performanceData = {
//                             SchemeName: data[0],
//                             BenchMark: data[1],
//                             Riskometer: {
//                                 Scheme: data[2],
//                                 BenchMark: data[3],
//                             },
//                             NAV: {
//                                 Date: data[4],
//                                 Regular: data[5],
//                                 Direct: data[6],
//                             },
//                             Returns: {
//                                 "1Year": {
//                                     Regular: data[7],
//                                     Direct: data[8],
//                                     BenchMark: data[9],
//                                 },
//                                 "3Year": {
//                                     Regular: data[10],
//                                     Direct: data[11],
//                                     BenchMark: data[12],
//                                 },
//                                 "5Year": {
//                                     Regular: data[13],
//                                     Direct: data[14],
//                                     BenchMark: data[15],
//                                 },
//                                 "10Year": {
//                                     Regular: data[16],
//                                     Direct: data[17],
//                                     BenchMark: data[18],
//                                 },
//                                 SinceLaunch: {
//                                     Regular: data[19],
//                                     Direct: data[20],
//                                     BenchMark: data[21],
//                                 },
//                             },
//                             DailyAUMCr: data[22],
//                         };

//                         const isEmptyPerformance = Object.values(performanceData.NAV).every(val => val === null);
//                         if (isEmptyPerformance) {
//                             console.log(`Skipping empty performance data for row ${row}`);
//                             continue;
//                         }

//                         const performance = new Performance(performanceData);
//                         await performance.save()
//                     }
//                 } else {
//                     console.log("No data range found in the sheet.");
//                 }
//                 try {
//                     await fs.promises.unlink(newFilePath);
//                     console.log(`File deleted: ${newFilePath}`);
//                 } catch (err) {
//                     console.error(`Failed to delete file: ${newFilePath}`, err);
//                 }
//                 }
//                 else {
//                     console.log(`File for category ${category.name} not found`);
//                 }
   

//             }

//             //Debt

//             // for(const category of categories.deptCategories){
//             //     await fundPerformanceFrame.select('#end-type', '1');
//             //     await fundPerformanceFrame.select('#primary-category', 'SDT');
//             //     await fundPerformanceFrame.select('#category', category.value);
//             //     await fundPerformanceFrame.select('#amc', 'ALL');
//             //     await sleep(3000);
//             //     await fundPerformanceFrame.click('.btn.btn-primary.amfi-btn');
//             //     await sleep(5000);
//             //     await fundPerformanceFrame.click('a#download-report-excel small');
//             //     await sleep(3000);

//             //     const files = fs.readdirSync(downloadPath);
//             //     const downloadedFile = files.find(file => file.endsWith('.xls'));
//             //     if (downloadedFile) {
//             //         const oldFilePath = path.join(downloadPath, downloadedFile);
//             //         const newFilePath = path.join(downloadPath, `Debt_${category.name}.xls`);
//             //         fs.renameSync(oldFilePath, newFilePath);
//             //         console.log(`File renamed to: ${newFilePath}`);
//             //     } else {
//             //         console.log(`File for category ${category.name} not found`);
//             //     }
//             //     await sleep(2000)

//             // }

//             // //Hybrid
//             // for(const category of categories.hybridCategories){
//             //     await fundPerformanceFrame.select('#end-type', '1');
//             //     await fundPerformanceFrame.select('#primary-category', 'SHY');
//             //     await fundPerformanceFrame.select('#category', category.value);
//             //     await fundPerformanceFrame.select('#amc', 'ALL');
//             //     await sleep(3000);
//             //     await fundPerformanceFrame.click('.btn.btn-primary.amfi-btn');
//             //     await sleep(5000);
//             //     await fundPerformanceFrame.click('a#download-report-excel small');
//             //     await sleep(3000);

//             //     const files = fs.readdirSync(downloadPath);
//             //     const downloadedFile = files.find(file => file.endsWith('.xls'));
//             //     if (downloadedFile) {
//             //         const oldFilePath = path.join(downloadPath, downloadedFile);
//             //         const newFilePath = path.join(downloadPath, `Hybird_${category.name}.xls`);
//             //         fs.renameSync(oldFilePath, newFilePath);
//             //         console.log(`File renamed to: ${newFilePath}`);
//             //     } else {
//             //         console.log(`File for category ${category.name} not found`);
//             //     }
//             //     await sleep(2000)

//             // }

//             // //Solution Oriented
//             // for(const category of categories.solutionOrientedCategories){
//             //     await fundPerformanceFrame.select('#end-type', '1');
//             //     await fundPerformanceFrame.select('#primary-category', 'SSO');
//             //     await fundPerformanceFrame.select('#category', category.value);
//             //     await fundPerformanceFrame.select('#amc', 'ALL');
//             //     await sleep(3000);
//             //     await fundPerformanceFrame.click('.btn.btn-primary.amfi-btn');
//             //     await sleep(5000);
//             //     await fundPerformanceFrame.click('a#download-report-excel small');
//             //     await sleep(3000);

//             //     const files = fs.readdirSync(downloadPath);
//             //     const downloadedFile = files.find(file => file.endsWith('.xls'));
//             //     if (downloadedFile) {
//             //         const oldFilePath = path.join(downloadPath, downloadedFile);
//             //         const newFilePath = path.join(downloadPath, `SolutionOriented_${category.name}.xls`);
//             //         fs.renameSync(oldFilePath, newFilePath);
//             //         console.log(`File renamed to: ${newFilePath}`);
//             //     } else {
//             //         console.log(`File for category ${category.name} not found`);
//             //     }
//             //     await sleep(2000)

//             // }
//             // // Other
//             // for(const category of categories.otherCategories){
//             //     await fundPerformanceFrame.select('#end-type', '1');
//             //     await fundPerformanceFrame.select('#primary-category', 'SOTH');
//             //     await fundPerformanceFrame.select('#category', category.value);
//             //     await fundPerformanceFrame.select('#amc', 'ALL');
//             //     await sleep(3000);
//             //     await fundPerformanceFrame.click('.btn.btn-primary.amfi-btn');
//             //     await sleep(5000);
//             //     await fundPerformanceFrame.click('a#download-report-excel small');
//             //     await sleep(3000);

//             //     const files = fs.readdirSync(downloadPath);
//             //     const downloadedFile = files.find(file => file.endsWith('.xls'));
//             //     if (downloadedFile) {
//             //         const oldFilePath = path.join(downloadPath, downloadedFile);
//             //         const newFilePath = path.join(downloadPath, `Other_${category.name}.xls`);
//             //         fs.renameSync(oldFilePath, newFilePath);
//             //         console.log(`File renamed to: ${newFilePath}`);
//             //     } else {
//             //         console.log(`File for category ${category.name} not found`);
//             //     }
//             //     await sleep(2000)

//             // }
            
//             return res.status(201).json({ message: "Files processed and data saved successfully!" });
//         } else {
//             console.log("fundperformance frame not found");
//             return res.status(200).json({ message: "FundPerformance Frame Not Found" });
//         }
        

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal Server Error", error })
//     }finally {
//         if (browser) {
//             await browser.close();
//             console.log("Puppeteer browser closed.");
//         }
//     }
// };






const puppeteer = require('puppeteer');
const categories = require('./category');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const Performance = require('./model');
const promisify = require("util").promisify;
const unlinkFile = promisify(fs.unlink);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.getAll = async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1250, height: 850 });
        await page.goto('https://www.amfiindia.com/');
        await sleep(5000);
        await page.click('.grid_3.omega');
        await sleep(5000);
        await page.click('.nav-box.last');
        await sleep(5000);
        await page.click('ul.otherdata > li:nth-child(5) > a');
        await sleep(8000);

        const allFrame = await page.frames();
        const fundPerformanceFrame = allFrame.find((frame) => frame.url().includes('valueresearchonline.com'));

        if (fundPerformanceFrame) {
            const downloadPath = path.join(__dirname, 'downloads');
            if (!fs.existsSync(downloadPath)) {
                fs.mkdirSync(downloadPath);
            }

            await page._client().send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath,
            });

            // Equity
            for (const category of categories.equityCategories) {
                await fundPerformanceFrame.select('#end-type', '1');
                await fundPerformanceFrame.select('#primary-category', 'SEQ');
                await fundPerformanceFrame.select('#category', category.value);
                await fundPerformanceFrame.select('#amc', 'ALL');
                await sleep(3000);
                await fundPerformanceFrame.click('.btn.btn-primary.amfi-btn');
                await sleep(5000);
                await fundPerformanceFrame.click('a#download-report-excel small');
                await sleep(3000);

                const files = fs.readdirSync(downloadPath);
                const downloadedFile = files.find(file => file.endsWith('.xls'));

                if (downloadedFile) {
                    const oldFilePath = path.join(downloadPath, downloadedFile);
                    const newFilePath = path.join(downloadPath, `Equity_${category.name}.xls`);
                    fs.renameSync(oldFilePath, newFilePath);
                    console.log(`File renamed to: ${newFilePath}`);

                    const workbook = await xlsx.readFile(newFilePath);
                    const sheetName = workbook.SheetNames[0];
                    const workSheet = workbook.Sheets[sheetName];

                    const range = workSheet['!ref'];
                    if (range) {
                        const [start, end] = range.split(':');
                        const lastRow = parseInt(end.replace(/[^\d]/g, ''));
                        console.log("Total rows: ", lastRow);

                        const startRow = 7;
                        for (let rowNumber = startRow; rowNumber <= lastRow; rowNumber++) {
                            const data = [];
                            for (let col = 1; col <= 23; col++) {
                                const cellAddress = xlsx.utils.encode_cell({ r: rowNumber - 1, c: col - 1 });
                                const cell = workSheet[cellAddress];
                                data.push(cell ? cell.v : null);
                            }

                            const isRowEmptyExceptFirstColumn = data.slice(1).every((value) => value === null);
                            if (isRowEmptyExceptFirstColumn) {
                                console.log(`Row ${rowNumber} skipped: Only column 1 has data.`);
                                continue; // Skipping empty rows
                            }

                            const performanceData = {
                                SchemeName: data[0],
                                BenchMark: data[1],
                                Riskometer: {
                                    Scheme: data[2],
                                    BenchMark: data[3],
                                },
                                NAV: {
                                    Date: data[4],
                                    Regular: data[5],
                                    Direct: data[6],
                                },
                                Returns: {
                                    "1Year": {
                                        Regular: data[7],
                                        Direct: data[8],
                                        BenchMark: data[9],
                                    },
                                    "3Year": {
                                        Regular: data[10],
                                        Direct: data[11],
                                        BenchMark: data[12],
                                    },
                                    "5Year": {
                                        Regular: data[13],
                                        Direct: data[14],
                                        BenchMark: data[15],
                                    },
                                    "10Year": {
                                        Regular: data[16],
                                        Direct: data[17],
                                        BenchMark: data[18],
                                    },
                                    SinceLaunch: {
                                        Regular: data[19],
                                        Direct: data[20],
                                        BenchMark: data[21],
                                    },
                                },
                                DailyAUMCr: data[22],
                            };

                            const isEmptyPerformance = Object.values(performanceData.NAV).every(val => val === null);
                            if (isEmptyPerformance) {
                                console.log(`Skipping empty performance data for row ${rowNumber}`);
                                continue;
                            }

                            const performance = new Performance(performanceData);
                            await performance.save();
                        }
                    } else {
                        console.log("No data range found in the sheet.");
                    }

                    // Delete file after processing
                    await unlinkFile(newFilePath);
                    console.log(`File deleted: ${newFilePath}`);
                } else {
                    console.log(`File for category ${category.name} not found`);
                }
            }

            return res.status(201).json({ message: "Files processed and data saved successfully!" });
        } else {
            console.log("fundperformance frame not found");
            return res.status(200).json({ message: "FundPerformance Frame Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    } finally {
        if (browser) {
            await browser.close();
            console.log("Puppeteer browser closed.");
        }
    }
};

