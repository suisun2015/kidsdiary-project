import controllers.diary.models.data.DiaryWeightResult;
import util.TimeUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * arch
 * 16/08/05
 */
public class Main3 {
  public static void main(String[] args) {
   System.out.println(" = " + TimeUtil.getNextDay(TimeUtil.getToday()).compareTo(TimeUtil.getToday()));
    List<String> list = new ArrayList<>();
    list.add("test");

    boolean b = list.contains(null);
    System.out.println("b = " + b);

    List<DiaryWeightResult> list2 = new ArrayList<>();
    DiaryWeightResult r1 = new DiaryWeightResult();
    r1.date = 12345L;
    DiaryWeightResult r2 = new DiaryWeightResult();
    r2.date = 23456L;

    list2.add(r2);
    list2.add(r1);
    List<DiaryWeightResult> a = list2.stream().sorted((e1, e2) -> e1.date.compareTo(e2.date)).collect(Collectors.toList());
    a.forEach(w -> System.out.println("w = " + w.date));

  }
}
