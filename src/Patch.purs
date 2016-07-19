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

isPatch :: String -> Either String Boolean
isPatch x = flip test x <$> pathReg

addPatch :: String -> String -> Maybe ValuePatch
addPatch path value = if true then
  Just ({
    op: "add"
  , path: path
  , value: value
  }) else Nothing
