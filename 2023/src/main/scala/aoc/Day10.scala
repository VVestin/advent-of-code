package aoc

import scala.io.Source
import aoc.Grid

sealed trait Dir
case object Up extends Dir
case object Down extends Dir
case object Left extends Dir
case object Right extends Dir

object Day10 extends App {
  val input = Source
    .fromFile("2023/in/10.txt")
    .getLines()
    .toList

  val grid = new Grid(input)

  val start = grid.find('S').get

  def cw(dir: Dir) = dir match {
    case Left  => Up
    case Up    => Right
    case Right => Down
    case Down  => Left
  }

  def ccw(dir: Dir) = dir match {
    case Left  => Down
    case Down  => Right
    case Right => Up
    case Up    => Left
  }

  def next(lastPos: Pos, pos: Pos, insideDir: Dir) = (grid.at(pos) match {
    case 'S'                         => None
    case 'F' if lastPos == pos.down  => Some(pos.right, cw(insideDir))
    case 'F' if lastPos == pos.right => Some(pos.down, ccw(insideDir))
    case '7' if lastPos == pos.left  => Some(pos.down, cw(insideDir))
    case '7' if lastPos == pos.down  => Some(pos.left, ccw(insideDir))
    case 'J' if lastPos == pos.up    => Some(pos.left, cw(insideDir))
    case 'J' if lastPos == pos.left  => Some(pos.up, ccw(insideDir))
    case 'L' if lastPos == pos.right => Some(pos.up, cw(insideDir))
    case 'L' if lastPos == pos.up    => Some(pos.right, ccw(insideDir))

    case '-' if lastPos == pos.left  => Some(pos.right, insideDir)
    case '-' if lastPos == pos.right => Some(pos.left, insideDir)
    case '|' if lastPos == pos.up    => Some(pos.down, insideDir)
    case '|' if lastPos == pos.down  => Some(pos.up, insideDir)
  })

  def pathLength(lastPos: Pos, pos: Pos, len: Int): Int = {
    next(lastPos, pos, Left) match {
      case None               => len
      case Some((nextPos, _)) => pathLength(pos, nextPos, len + 1)
    }
  }

  def numDots(pos: Pos): Int =
    if (grid.at(pos) == '.') 1 + numDots(pos.right)
    else 0

  def insideCount(lastPos: Pos, pos: Pos, insideDir: Dir, count: Int): Int = {
    val newInside =
      if (insideDir == Right) numDots(pos.right)
      else 0
    if (newInside > 0) println(pos, insideDir, count + newInside)
    next(lastPos, pos, insideDir) match {
      case None => count
      case Some((nextPos, nextInsideDir)) => {
        insideCount(pos, nextPos, nextInsideDir, count + newInside)
      }
    }
  }

  // val part1 = pathLength(start, start.down, 1)
  val part2 = insideCount(start, start.right, Up, 0)

  // println(part1 / 2)
  println(part2)
}
