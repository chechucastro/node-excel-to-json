/* LO HUBIERA HECHO ASI USANDO LA LIBRERIA XLSX.
// Import de libs
import XLSX from 'xlsx';
import { writeFileSync } from 'fs';
// Rutas de archivos
const excelFilePath = './assets/docs/fictional_characters_db_v2.xlsx';
const outputJsonFilePath = './assets/docs/generated/excelData.json';

// Leer el archivo excel
const workbook = XLSX.readFile(excelFilePath);

// Obtener el nombre de la primera hoja (la primera hoja es la que contiene los datos)
const sheetName = workbook.SheetNames[0];

// Obtener la hoja de trabajo
const worksheet = workbook.Sheets[sheetName];

// Convertir la hoja de trabajo a un array de objetos
const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// La primera fila son los encabezados
const [, ...dataRows] = rows;

const excelData = dataRows.map((row) => ({
    username: row[0],
    email: row[1],
    password: row[2],
    category: row[3],
}));


console.log(excelData);

// Crear un archivo json con los datos
writeFileSync(outputJsonFilePath, JSON.stringify(excelData, null, 2));

*/

/*
  USANDO LA LIBRERIA FS SOLAMENTE
*/

import { readFileSync, writeFileSync } from 'fs';

const csvFilePath = './assets/docs/fictional_characters_db_v2.csv';
const outputJsonFilePath = './assets/docs/generated/excelData.json';

const fileData = readFileSync(csvFilePath, 'utf8').trim();
const lines = fileData.split('\n');

const headers = lines[0].split(',').map((header) => header.trim().toLowerCase());

const excelData = lines.slice(1).map((row) => {
    const values = row.split(',').map((cell) => cell.trim());
    return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
    }, {});
});

console.log(excelData);

writeFileSync(outputJsonFilePath, JSON.stringify(excelData, null, 2));
