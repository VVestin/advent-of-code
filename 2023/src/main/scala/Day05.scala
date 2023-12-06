import scala.io.Source

object Day05 extends App {
  val input = Source
    .fromFile("2023/in/05.txt")
    .toList
    .foldLeft("")(_ + _)
    .split("\n\n")
    .toList

  val seeds = input(0).split(": ")(1).split(" ").map(_.toLong).toList

  val maps =
    input
      .drop(1)
      .map(_.split("\n").drop(1).map(_.split(" ").map(_.toLong).toList).toList)

  def locationForSeed(seed: Long): Long = {
    maps
      .foldLeft(seed)((value, map) => {
        map
          .find(_ match {
            case List(_, source, range) => (
              value >= source && value <= source + range
            )
          }) match {
          case Some(List(dest, source, _)) => value + dest - source
          case None                        => value
        }
      })
  }

  def minLocationForRange(
      start: Long,
      end: Long,
      maps: List[List[List[Long]]]
  ): Long = {
    if (start >= end) return Long.MaxValue
    println(s"minLocationForRange($start, $end, ${maps.length})")
    maps match {
      case Nil => start
      case map :: restOfMaps =>
        map
          .map(_ match {
            case List(dest, source, range) =>
              val start2 = source
              val end2 = source + range
              val offset = dest - source
              if (end <= start2 || end2 < start) Long.MaxValue
              else
                List(
                  minLocationForRange(start, Math.min(end, start2), restOfMaps),
                  minLocationForRange(
                    start2 + offset,
                    Math.min(end, end2) + offset,
                    restOfMaps
                  ),
                  minLocationForRange(end2, end, restOfMaps)
                ).min
          })
          .min
    }
  }

  val part1 = seeds
    .map(locationForSeed)
    .min

  val part2 = seeds
    .grouped(2)
    .toList
    .map(_ match {
      case List(start, range) => minLocationForRange(start, start + range, maps)
    })

  println(part1)
  println("---")
  println(part2)
}
