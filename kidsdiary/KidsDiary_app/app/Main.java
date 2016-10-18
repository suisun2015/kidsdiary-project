import controllers.file.FileUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import models.User;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.lang3.time.DateUtils;
import util.TimeUtil;

import java.io.*;
import java.security.*;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class Main {

  public static void dontRun(String[] args) {
    try {
      Key key = MacProvider.generateKey();
      ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("idTokenizer"));
      oos.writeObject(key);

      ObjectInputStream ois = new ObjectInputStream(new FileInputStream("idTokenizer"));
      Key readKey = (Key) ois.readObject();

      String token = Jwts.builder().setSubject("1").signWith(SignatureAlgorithm.HS512, readKey).compact();

      String b = Jwts.parser().setSigningKey(readKey).parseClaimsJws(token + "a").getBody().getSubject();
      //System.out.println(token + "\n" + b);

    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }

  public static void main(String[] args) throws IOException {
    //Long l = Long.parseLong("profile", 36);
    //System.out.println("l = " + l);
    long prf = 56093179874L;
    System.out.println("l = " + Long.toString(prf, 36));

    System.out.println("new Date() = " + new Date(1455305600000L));
    Date diaryDate = DateUtils.truncate(new Date(1435307700000L), Calendar.DATE);
    Date a = TimeUtil.toTime(1455305600000L);
    System.out.println("a = " + diaryDate);
    System.out.println(" String.format(\"%f℃ %s\", hm.temperature, hm.healthStatus) = " +
        String.format("%.1f℃ %s", 36.79999f, "健康"));
    User u = new User();
    System.out.println("i = " + u);

    File[] files = new File("storage/2016/").listFiles();
    for (File file : files) {

      System.out.println("new File(\"storage/2016/\").listFiles() = " + file);
      File[] files2 = file.listFiles();
      for (File file2 : files2) {
        FileOutputStream fileOutputStream1 = new FileOutputStream(new File(file2.getAbsolutePath() + "_th"));
        FileOutputStream fileOutputStream2 = new FileOutputStream(new File(file2.getAbsolutePath() + "_md"));
        FileOutputStream fileOutputStream3 = new FileOutputStream(new File(file2.getAbsolutePath() + "_lg"));
        Thumbnails.of(file2)
            .size(180, 180)
            .outputFormat("jpeg")
            .toOutputStream(fileOutputStream1);
        Thumbnails.of(file2)
            .size(360, 360)
            .outputFormat("jpeg")
            .toOutputStream(fileOutputStream2);
        Thumbnails.of(file2)
            .size(540, 540)
            .outputFormat("jpeg")
            .toOutputStream(fileOutputStream3);
      }

    }


  }
}
