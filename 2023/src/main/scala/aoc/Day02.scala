import scala.io.Source

object Day02 extends App {
  val input = Source.fromFile("2023/in/02.txt").getLines.toList

  val part1 = input
    .map(line => {
      val game = line.split(": ")(0).split(" ")(1).toInt
      val moves = line.split(": ")(1).split("(,|;) ").toList
      if (
        moves.exists(_.split(" ").toList match {
          case x :: "red" :: Nil   => x.toInt > 12
          case x :: "green" :: Nil => x.toInt > 13
          case x :: "blue" :: Nil  => x.toInt > 14
        })
      ) 0
      else game
    })
    .sum

  val max = (a: Int, b: Int) => if (a > b) a else b

  val part2 = input
    .map(line => {
      val game = line.split(": ")(0).split(" ")(1).toInt
      val moves = line.split(": ")(1).split("(,|;) ").toList
      moves
        .foldLeft((0, 0, 0))((acc, move) =>
          acc match {
            case (r, g, b) =>
              move.split(" ").toList match {
                case x :: "red" :: Nil   => (max(r, x.toInt), g, b)
                case x :: "green" :: Nil => (r, max(g, x.toInt), b)
                case x :: "blue" :: Nil  => (r, g, max(b, x.toInt))
                case _                   => acc
              }
          }
        ) match {
        case (r, g, b) => r * g * b
      }
    })
    .sum

  println(part1)
  println(part2)
}
