module Main (exampleLine, basket, Fruits, Shape, Point, bar, baz) where

import Prelude

type PointType = { x :: Number, y :: Number }

data Point = Point PointType

data Shape =
  Circle Point Number |
  Rectangle Point Number Number |
  Line Point Point |
  Text Point String

data Color = Red | Green | Yellow
type Weight = Number

type Fruit = { color :: Color, weight :: Weight }
data Fruits = Apple Fruit | Peach Fruit

basket :: Fruits
basket = Apple { color: Red, weight: 10.0 }

instance showBasket :: Show Fruits where
  show (Apple x) = "Apple color:" <> show x.color <> " weight: " <> show x.weight
  show (Peach x) = "Peach color:" <> show x.color <> " weight: " <> show x.weight

instance showColor :: Show Color where
  show Red = "red"
  show Green = "green"
  show Yellow = "yellow"

exampleLine :: Shape
exampleLine = Line p1 p2
  where
  p1 :: Point
  p1 = Point { x: 0.0, y: 0.0 }

  p2 :: Point
  p2 = Point { x: 100.0, y: 50.0 }

bar :: Shape
bar = Circle (Point { x: 10.0, y: 10.0 }) 23.0

baz :: Shape
baz = Text (Point { x: 11.0, y: 12.0 }) "Foo bar"

instance showPoint :: Show Point where
  show (Point { x: x, y: y }) =
    "(" <> show x <> ", " <> show y <> ")"

instance showShape :: Show Shape where
  show (Line p1 p2) = show p1 <> show p2
  show (Circle p1 x) = "Circle: " <> show p1 <> " radius: " <> show x
  show (Text p1 s) = "Start at: " <> show p1 <> " text: " <> s
  show (Rectangle p1 x y) = show p1 <> show x <> show y
