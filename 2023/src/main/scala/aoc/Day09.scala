import scala.io.Source

object Day09 extends App {
  val input = Source
    .fromFile("2023/in/09.txt")
    .getLines()
    .toList
    .map(_.split(" ").map(_.toInt).toList)

  def diff(nums: List[Int]): List[Int] =
    nums.drop(1).zip(nums.dropRight(1)).map({ case (a, b) => a - b })

  def nextNum(nums: List[Int]): Int = {
    if (nums.forall(_ == 0)) 0
    else nums.takeRight(1)(0) + nextNum(diff(nums))
  }

  def prevNum(nums: List[Int]): Int = {
    if (nums.forall(_ == 0)) 0
    else nums.take(1)(0) - prevNum(diff(nums))
  }

  val part1 = input.map(nextNum).sum
  val part2 = input.map(prevNum).sum

  println(part1)
  println(part2)
}
