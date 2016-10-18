import java.io.FileOutputStream;
import java.io.IOException;
import java.util.stream.IntStream;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

public class POI_MAIN {
  public static void main(String[] args) {
    String type = args[0];
    int rows = Integer.parseInt(args[1]);
    String fileName = args[2];

    Workbook workbook;
    switch (type.toUpperCase()) {
      case "XSSF":
        workbook = new XSSFWorkbook();
        break;
      case "SXSSF":
        workbook = new SXSSFWorkbook();
        break;
      default:
        workbook = new XSSFWorkbook();
        break;
    }

    Sheet sheet = workbook.createSheet();

    IntStream
        .range(0, rows)
        .forEach(i -> {
          Row row = sheet.createRow(i);

          row.createCell(0).setCellValue("テスト-" + (i + 1));
          row.createCell(1).setCellValue("foo-" + (i + 1));
          row.createCell(2).setCellValue("bar-" + (i + 1));
        });

    try (FileOutputStream fos = new FileOutputStream(fileName)) {
      workbook.write(fos);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}