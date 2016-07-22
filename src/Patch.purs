module Patch ( add, ValuePatch ) where

import Prelude
import Data.String.Regex
import Data.Maybe
import Data.Either
import Partial.Unsafe
import Data.Array

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

data PatchValue = Maybe | String | Number

data Patch = ValuePatch | MovePatch | RemovePatch

contains :: forall a. a -> Array -> Boolean
contains x xs = findIndex (\y -> x == y) xs

newPatch :: forall a. String -> String -> a -> Patch
newPatch op path value
  | contains op ["add", "merge"] == true = ValuePatch op path value

isPath :: String -> Boolean
isPath x = test y x where
  y = unsafePartial
    case regex "^(\\/[a-z0-9~\\-%^|\"\\ ]*)*$" noFlags of
      Right r -> r

isValue :: forall a. Maybe a -> Boolean
isValue x = true

create :: String -> String -> Maybe -> Either String Patch
create op path value
  | isPath path /= true = Left ("The path '" <> path <> "' is not valid")
  | op /= "remove" && isValue value /= true = Left ("The value '" <> value <> "' is not valid")
  | otherwise = Right (newPatch { op, path, value })

add :: String -> String -> Either String Patch
add path value = create path (Just value)

remove path = create "remove" path Nothing

instance showValuePatch :: Show ValuePatch where
  show (ValuePatch x) =
    "{ op: " <> x.op <> ", " <>
    " path: " <> x.path <> ", " <>
    " value: " <> x.value <> " }"

