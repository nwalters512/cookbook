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
        "rounded-md",
        "bg-white",
        "checked:bg-purple-700",
        "checked:border-purple-700",
        "transition",
        "duration-200",
        "cursor-pointer",
        "focus:outline-none",
        "focus-visible:border-black",
        className,
      ])}
    />
  )
}
