import scala.io.Source

object Day04 extends App {
  val input = Source
    .fromFile("2023/in/04.txt")
    .getLines
    .toList
    .map(line =>
      line
        .split(": ")(1)
        .split(" \\| ")
        .toList
        .map(sides => sides.split(" ").filter(_ != "").map(_.toInt).toList)
    )

  val part1 = input
    .map(_ match {
      case List(myNums, winningNums) =>
        myNums.filter(winningNums.contains(_)).length
    })

  val part2 =
    part1.reverse.foldLeft(List[Int]())((prev, n) =>
      1 + prev.take(n).sum :: prev
    )

  println(part1.map(n => Math.pow(n - 1, 2).toInt).sum)
  println(part2.sum)
}
