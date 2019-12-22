import ReadLine from 'readline';

process.stdin.setEncoding('utf8');

const readLine = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readLine.setPrompt('Input: ');

readLine.on('line', (inputString) => {
    readLine.write('Output: ');
    readLine.write([...inputString].reverse().join(''));

    readLine.clearLine();
    readLine.prompt();
});

readLine.prompt();
