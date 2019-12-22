import csv from 'csvtojson';
import {
    createReadStream,
    createWriteStream,
    existsSync,
    mkdirSync,
} from 'fs';

// resolve files path
const csvFilePath = process.argv[2] || './csv';
const outputDirectory = process.argv[3] || './results';
const outputFilePath = `${outputDirectory}/${Date.now()}.txt`;

if (!existsSync(outputDirectory)) {
    mkdirSync(outputDirectory, {recursive: true});
}

const readStream = createReadStream(csvFilePath);
const writeStream = createWriteStream(outputFilePath, {flags: 'a+'});

const csvConfig = {
    ignoreColumns: /amount/,
};

const headersFormatter = (line, index) => (index === 0)
    ? line.toLowerCase()
    : line;

const csvReader = csv(csvConfig).preFileLine(headersFormatter);

readStream.pipe(csvReader).pipe(writeStream);
