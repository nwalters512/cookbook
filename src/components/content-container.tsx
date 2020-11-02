import React from "react"

const ContentContainer: React.FC = ({ children }) => {
  return <div className="w-full max-w-screen-md mx-auto px-3">{children}</div>
}

export default ContentContainer
