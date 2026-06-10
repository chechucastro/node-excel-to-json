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