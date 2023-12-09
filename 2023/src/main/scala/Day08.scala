import scala.io.Source

object Day08 extends App {
  val input = Source
    .fromFile("2023/in/08.txt")
    .getLines()
    .toList

  val pattern = input(0)
  val nodes = input
    .drop(2)
    .map(line => {
      val from = line.take(3)
      val left = line.slice(7, 10)
      val right = line.slice(12, 15)

      (from, (left, right))
    })
    .toMap

  def numSteps(start: String, pattern: String, steps: Int): Int = {
    val next =
      if (pattern(0) == 'L') nodes(start)._1
      else nodes(start)._2
    if (next.endsWith("Z")) steps
    else numSteps(next, pattern.drop(1) + pattern.head, steps + 1)
  }

  def gcd(a: Long, b: Long): Long = {
    if (b == 0) a
    else gcd(b, a % b)
  }

  def lcm(a: Long, b: Long) = a * b / gcd(a, b)

  val part1 = numSteps("AAA", pattern, 1)
  val part2 = nodes.keys
    .filter(_.endsWith("A"))
    .map(numSteps(_, pattern, 1))
    .foldLeft(1L)((a, b) => lcm(a.toLong, b.toLong))

  println(part2)
}
