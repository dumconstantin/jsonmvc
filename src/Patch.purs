module Patch ( addPatch ) where

import Data.String.Regex
import Data.Maybe
import Data.Either
import Prelude

type ValuePatch =
  {
    op :: String
  , path :: String
  , value :: String
  }

pathReg = regex "^(/[a-zA-Z0-9]*)+$" noFlags

isPath :: String -> Boolean
isPath x = map (\y -> test y x) pathReg

isValue :: forall a. a -> Boolean
isValue x = true

addPatch :: String -> String -> Either String ValuePatch
addPatch x y
  | isPath x /= true = Left "The path is not valid"
  | isValue y /= true = Left "The value is not valid"
  | otherwise = Right ({
    op: "add"
  , path: x
  , value: y
  })
