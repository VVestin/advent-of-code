import scala.io.Source
import java.io.{FileNotFoundException, IOException}

object Day01 extends App {
  val input = Source.fromFile("2023/in/01.txt").getLines.toList

  val part1 = input
    .map(s => s.filter(c => c.isDigit))
    .map(s => 10 * s.take(1).toInt + s.reverse.take(1).toInt)
    .sum

  val part2 = input
    .map(s => s.replaceAll("one", "o1e"))
    .map(s => s.replaceAll("two", "t2o"))
    .map(s => s.replaceAll("three", "t3e"))
    .map(s => s.replaceAll("four", "4"))
    .map(s => s.replaceAll("five", "5e"))
    .map(s => s.replaceAll("six", "6"))
    .map(s => s.replaceAll("seven", "7n"))
    .map(s => s.replaceAll("eight", "e8t"))
    .map(s => s.replaceAll("nine", "n9e"))
    .map(s => s.filter(c => c.isDigit))
    .map(s => 10 * s.take(1).toInt + s.reverse.take(1).toInt)
    .sum

  println(part1)
  println(part2)
}
