import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellReference;

public class Main2 {

  //適当なディレクトリに書き換えてください
  static final String INPUT_DIR = "resources/xlsx/";

  public static void main(String[] args) {
    try {
       String GOOGLE_SERVICE_JSON = "./resources/NotificationTestApp-3a9cab944e20.json";
      FirebaseOptions options = new FirebaseOptions.Builder()
          .setServiceAccount(new FileInputStream(GOOGLE_SERVICE_JSON))
          .setDatabaseUrl("https://notificationtestapp-f7371.firebaseio.com/")
          .build();
      FirebaseApp app = FirebaseApp.initializeApp(options);

      FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance(app);
      DatabaseReference ref = firebaseDatabase.getReference("message_list/kidsdiary_room2");
      ref.setValue("new_value");
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }

    try {

      String xlsxFileAddress = INPUT_DIR + "attendance_sheet.xlsx";
      String xlsxTmpFileAddress = INPUT_DIR + "attendance_sheet_tmp.xlsx";

      //共通インターフェースを扱える、WorkbookFactoryで読み込む
      Workbook wb = WorkbookFactory.create(new FileInputStream(xlsxFileAddress));

      Sheet teacherSheet = wb.getSheet("職員");
      CellReference cr = new CellReference("B4");
      Row row = teacherSheet.getRow(cr.getRow());
      Cell cell = row.getCell(cr.getCol());

      System.out.println("cell.getCellValue() = " + getCellValue(cell));
      cell.setCellValue("さくらうみ幼稚園");
      //全セルを表示する
//      for (Sheet sheet : wb ) {
//        for (Row row : sheet) {
//          for (Cell cell : row) {
//           cell.setCellValue("");
//          }
//          System.out.println();
//        }
//      }
      wb.write(new FileOutputStream(xlsxTmpFileAddress));
      wb.close();

    } catch (Exception e) {
      e.printStackTrace();
    } finally {

    }

  }


  private static Object getCellValue(Cell cell) {
    switch (cell.getCellType()) {

      case Cell.CELL_TYPE_STRING:
        return cell.getRichStringCellValue().getString();

      case Cell.CELL_TYPE_NUMERIC:
        if (DateUtil.isCellDateFormatted(cell)) {
          return cell.getDateCellValue();
        } else {
          return cell.getNumericCellValue();
        }

      case Cell.CELL_TYPE_BOOLEAN:
        return cell.getBooleanCellValue();

      case Cell.CELL_TYPE_FORMULA:
        return cell.getCellFormula();

      default:
        return null;

    }

  }

}