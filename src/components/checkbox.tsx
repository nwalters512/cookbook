import React from "react"
import classNames from "classnames"

export interface CheckboxProps
  extends Pick<React.HTMLProps<HTMLInputElement>, "className" | "onChange"> {
  checked: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  className,
  onChange,
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={classNames([
        "checkbox",
        "appearance-none",
        "h-5",
        "w-5",
        "shrink-0",
        "border-2",
        "border-gray-300",
        "dark:border-gray-600",
        "rounded-md",
        "bg-white",
        "dark:bg-gray-700",
        "checked:bg-orange-500",
        "dark:checked:bg-orange-600",
        "checked:border-orange-500",
        "dark:checked:border-orange-600",
        "transition",
        "duration-200",
        "cursor-pointer",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-orange-500",
        "focus:ring-offset-2",
        "dark:focus:ring-offset-gray-800",
        className,
      ])}
    />
  )
}
