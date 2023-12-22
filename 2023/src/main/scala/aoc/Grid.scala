package aoc

case class Pos(row: Int, col: Int) {
  def up() = Pos(row - 1, col)
  def down() = Pos(row + 1, col)
  def left() = Pos(row, col - 1)
  def right() = Pos(row, col + 1)

  def neighbors() = List(left(), up(), right(), down())
}

class Grid(lines: List[String]) {
  val height = lines.length
  val width = lines(0).length()

  def within(row: Int, col: Int) =
    row >= 0 && row < height && col >= 0 && col < width

  def at(pos: Pos): Char = at(pos.row, pos.col)

  def at(row: Int, col: Int) = {
    if (row < 0 || row >= height || col < 0 || col >= width) ' '
    else lines(row).charAt(col)
  }

  def updated(pos: Pos, c: Char): Grid = updated(pos.row, pos.col, c)

  def updated(row: Int, col: Int, c: Char) = new Grid(
    lines.updated(row, lines(row).updated(col, c))
  )

  def find(c: Char) = {
    lines.zipWithIndex.find(_ match {
      case (line, _) => line.contains(c)
    }) match {
      case Some((line, row)) => Some(Pos(row, line.indexOf(c)))
      case None              => None
    }
  }
}
