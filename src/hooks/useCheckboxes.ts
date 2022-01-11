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

  return {
    checked,
    handleToggle,
  }
}
