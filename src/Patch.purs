module Patch where

import Data.Either
import Data.Maybe
import Prelude
import Partial.Unsafe
import Data.String.Regex

newtype Path = Path String
newtype Value = Value String

data Patch =
  Add Path Value |
  Test Path Value |
  Replace Path Value |
  Move Path Path |
  Copy Path Path |
  Remove Path

isPath :: String -> Boolean
isPath x = test y x where
  y = unsafePartial
    case regex "^(\\/[a-z0-9~\\-%^|\"\\ ]*)*$" noFlags of
      Right r -> r

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
createPatch op x y
  | isRight x && isRight y = op x y
  | otherwise = x

add :: forall a. String -> a -> Either String Patch
add path value = createPatch Add (parsePath path) (parseValue value)

testPatch :: forall a. String -> a -> Either String Patch
testPatch path value = createPatch Test (parsePath path) (parseValue value)

replace :: forall a. String -> a -> Either String Patch
replace path value = createPatch Test (parsePath path) (parseValue value)

move :: String -> String -> Either String Patch
move fromPath toPath = createPatch Test (parsePath fromPath) (parsePath toPath)

copy :: String -> String -> Either String Patch
copy fromPath toPath = createPatch Test (parsePath fromPath) (parsePath toPath)

remove :: String -> Either String Patch
remove path = createPatch Remove (parsePath path) Right Nothing
