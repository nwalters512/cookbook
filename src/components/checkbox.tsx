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
        "h-4",
        "w-4",
        "border",
        "border-gray-300",
        "rounded-sm",
        "bg-white",
        "checked:bg-blue-600",
        "checked:border-blue-600",
        "transition",
        "duration-200",
        className,
      ])}
    />
  )
}
