import React from "react"

interface ContentContainerProps {
  children: React.ReactNode
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return <div className="w-full max-w-screen-md mx-auto px-4">{children}</div>
}

export default ContentContainer
