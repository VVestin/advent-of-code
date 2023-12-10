import scala.io.Source

object Day06 extends App {
  val input = Source
    .fromFile("2023/in/06.txt")
    .getLines()
    .toList
    .map(_.split(":")(1))

  val times = input(0).split(" ").filter(_.length > 0).toList.map(_.toInt)
  val dists = input(1).split(" ").filter(_.length > 0).toList.map(_.toInt)

  val part1 = times
    .zip(dists)
    .map({
      case (time, dist) => {
        List
          .range(1, time - 1)
          .map(holdLength => holdLength * (time - holdLength))
          .filter(_ > dist)
          .length
      }
    })
    .product

  val part2time = input(0).replace(" ", "").toLong
  val part2dist = input(1).replace(" ", "").toLong
  def firstWin(time: Int): Int = {
    if (time * (part2time - time) > part2dist) time
    else firstWin(time + 1)
  }

  val part2 = part2time - firstWin(0) * 2 + 1

  println(part1)
  println(part2)
}
