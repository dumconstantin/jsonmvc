module Patch ( add ) where

type ValuePatch =
  {
    op :: String
  , path :: String
  , value :: String
  }

add :: String -> String -> ValuePatch
add path value =
  ({
    op: "add"
  , path: path
  , value: value
  })
