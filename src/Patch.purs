module Patch ( addPatch, ValuePatch ) where

import Prelude
import Data.String.Regex
import Data.Maybe
import Data.Either
import Partial.Unsafe

newtype ValuePatch = ValuePatch
  {
    op :: String
  , path :: String
  , value :: String
  }

newtype MovePatch = MovePatch
  {
    op :: String
  , path :: String
  , from :: String
  }

newtype RemovePatch = RemovePatch
  {
    op :: String
  , path :: String
  }

isPath :: String -> Boolean
isPath x = test y x where
  y = unsafePartial
    case regex "^(\\/[a-z0-9~\\-%^|\"\\ ]*)*$" noFlags of
      Right r -> r

isValue :: forall a. a -> Boolean
isValue x = true

addPatch :: String -> String -> Either String ValuePatch
addPatch path value
  | isPath path /= true = Left ("The path '" <> path <> "' is not valid")
  | isValue value /= true = Left ("The value '" <> value <> "' is not valid")
  | otherwise = Right (ValuePatch { op, path, value }) where op = "add"

instance showValuePatch :: Show ValuePatch where
  show (ValuePatch x) =
    "{ op: " <> x.op <> ", " <>
    " path: " <> x.path <> ", " <>
    " value: " <> x.value <> " }"
