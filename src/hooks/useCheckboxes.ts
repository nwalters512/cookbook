import React from "react"
import { useLocalStorage } from "@rehooks/local-storage"

export function useCheckboxes(key: string) {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    key,
    {}
  )

  const handleToggle = (value: string) => {
    setChecked({
      ...checked,
      [value]: !(checked[value] ?? false),
    })
  }

  const clearChecked = () => {
    setChecked({})
  }

  // To avoid a mismatch during hydration, we need to initially render with an
  // empty state to match the default state of `useLocalStorage()`. After the
  // first render (via `useEffect`), we copy the state from local storage into
  // this hook and keep it up to date thereafter. This keeps the state from
  // `useLocalStorage()` as the source of truth.
  const [state, setState] = React.useState({})
  React.useEffect(() => {
    setState(checked)
  }, [checked])

  return {
    checked: state,
    clearChecked,
    handleToggle,
  }
}
