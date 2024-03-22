export async function readCSV(filePath: string): Promise<any[]> {
  const response = await fetch(filePath);
  const text = await response.text();
  const results = parseCSV(text);
  return results;
}

function parseCSV(csvText: string): any[] {
  const rows = csvText.split("\n");
  const data: any[] = [];

  if (rows.length > 0) {
    const headers = rows[0].split(",");

    // วนลูปผ่านแถวข้อมูลทั้งหมด โดยข้ามแถวแรกเนื่องจากมันเป็นหัวข้อคอลัมน์
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(",");
      const rowData: any = {};

      // วนลูปผ่านค่าของแต่ละคอลัมน์
      for (let j = 0; j < headers.length; j++) {
        rowData[headers[j].trim()] = values[j].trim();
      }

      data.push(rowData);
    }
  }

  return data;
}
