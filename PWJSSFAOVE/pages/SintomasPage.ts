import { Page } from "@playwright/test";

export default class SintomasPage {

	page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    //utilitario
    async validateRecord(column: string, text: string) {
        const columnIndex = await this.getColumnIndex(column);
        if (columnIndex !== -1) {
          const cellsInColumn = await this.page.$$(`table tbody td:nth-child(${columnIndex})`);
          console.log("celdas:"+ cellsInColumn)
          for (const cell of cellsInColumn) {
            const cellValue = await cell.innerText();
            if (cellValue === text) {
              console.log(`Texto '${text}' encontrado en la columna '${column}'.`);
              return true
            } else {
                return false
            }
          }
        } else {
          console.error(`La columna '${column}' no fue encontrada.`);
          return false
        }
      }
    
      private async getColumnIndex(columnName: string): Promise<number> {
        const columnHeaders = await this.page.$$('table thead th');
        let index = -1;
    
        for (let i = 0; i < columnHeaders.length; i++) {
          const headerText = await columnHeaders[i].innerText();
          if (headerText.trim() === columnName) {
            index = i + 1;
            break;
          }
        }
        return index;
      }
    }
