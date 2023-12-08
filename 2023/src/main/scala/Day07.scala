import scala.io.Source

object Day07 extends App {
  val input = Source
    .fromFile("2023/in/07.txt")
    .getLines()
    .toList
    .map(_.split(" ").toList)

  def groupLengths(hand: String) = if (hand == "") List(0)
  else
    hand
      .split("")
      .toList
      .sorted
      .groupBy(x => x)
      .values
      .toList
      .map(_.length)
      .sorted
      .reverse

  def handStrength(groupLengths: List[Int]) = groupLengths match {
    case List(5)             => 6
    case List(4, 1)          => 5
    case List(3, 2)          => 4
    case List(3, 1, 1)       => 3
    case List(2, 2, 1)       => 2
    case List(2, 1, 1, 1)    => 1
    case List(1, 1, 1, 1, 1) => 0
  }

  def tiebreakVal(order: String, hand: String): Int = {
    if (hand.length() == 0) 0
    else
      13 * tiebreakVal(order, hand.dropRight(1)) + order.indexOf(hand.last)
  }

  def totalWinnings(lines: List[List[String]]) =
    lines.zipWithIndex
      .map({ case (List(_, bid), i) =>
        bid.toInt * (i + 1)
      })
      .sum

  val part1 = input
    .sortBy({ case List(hand, _) =>
      handStrength(groupLengths(hand)) * 1000000 + tiebreakVal(
        "23456789TJQKA",
        hand
      )
    })

  val part2 = input
    .sortBy({ case List(hand, _) =>
      val numJokers = hand.filter(_ == 'J').length()
      val withoutJokers = groupLengths(hand.filter(_ != 'J'))
      val withJokers = withoutJokers.head + numJokers :: withoutJokers.tail

      handStrength(withJokers) * 1000000 + tiebreakVal(
        "J23456789TQKA",
        hand
      )
    })

  println(totalWinnings(part1))
  println(totalWinnings(part2))
}
