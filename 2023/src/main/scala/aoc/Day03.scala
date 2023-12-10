import scala.io.Source
import scala.collection.mutable.Map

object Day03 extends App {
  val input =
    Source
      .fromFile("2023/in/03.txt")
      .getLines
      .toList
      .map(s => ("." + s + ".").split("").toList)

  def numBefore(r: Int, c: Int): Long = {
    if (!input(r)(c).charAt(0).isDigit) 0
    else 10 * numBefore(r, c - 1) + input(r)(c).toLong
  }

  def endOfNum(r: Int, c: Int): Option[(Int, Int)] = {
    if (!input(r)(c).charAt(0).isDigit) None
    else if (input(r)(c + 1).charAt(0).isDigit) endOfNum(r, c + 1)
    else Some(r, c)
  }

  def adjacentNums(r: Int, c: Int): List[Long] = {
    List(
      endOfNum(r - 1, c - 1),
      endOfNum(r - 1, c),
      endOfNum(r - 1, c + 1),
      endOfNum(r, c - 1),
      endOfNum(r, c + 1),
      endOfNum(r + 1, c - 1),
      endOfNum(r + 1, c),
      endOfNum(r + 1, c + 1)
    ).distinct
      .map({
        case Some((r, c)) => numBefore(r, c)
        case None         => 0
      })
      .filter(_ != 0)
  }

  val part2 = input.zipWithIndex
    .map({ case (line, r) =>
      line.zipWithIndex
        .foldLeft(0L)({
          case (sum, ("*", c)) => {
            val adjacent = adjacentNums(r, c)

            println(s"$r\t$c\t$adjacent")
            adjacent match {
              case List(a, b) =>
                sum + a * b
              case _ => sum
            }
          }
          case (sum, _) => sum
        })
    })
    .sum

  println(part2)
}
