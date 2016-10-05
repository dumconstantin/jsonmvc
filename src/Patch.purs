module Patch where

import Data.Either
import Data.Maybe
import Prelude
import Partial.Unsafe
import Data.String.Regex

newtype Path = Path String
newtype Value = Value String

type ValuePatch = { path:: String, value:: String }
type FromPatch = { path:: String, from:: String }
type RemovePatch = { path:: String }

data Patch =
  Add ValuePatch |
  Test ValuePatch |
  Replace ValuePatch |
  Move FromPatch |
  Copy FromPatch |
  Remove RemovePatch

pathRegex = regex "^(\\/[a-z0-9~\\-%^|\"\\ ]*)*$" noFlags

isPath :: String -> Boolean
isPath x = isRight (map <$> test pathRegex x)

isValue :: forall a. a -> Boolean
isValue x = true

parsePath :: String -> Either String Path
parsePath x =
  if isPath x /= true
    then Left ("The path '" <> x <> "' is not valid")
    else Right (Path x)

parseValue :: forall a. a -> Either String a
parseValue x =
  if isValue x /= true
     then Left ("The value is not valid")
     else Right x

createPatch :: forall a. Patch -> Either String Path -> Either String a -> Either String Patch
createPatch dataType obj
  | isPath obj.path && isRight y = dataType x
  | otherwise = obj

valuePatch :: forall a. Operation -> String -> a -> Patch
valuePatch op path value = 

