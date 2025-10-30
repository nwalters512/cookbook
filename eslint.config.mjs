import nextConfig from "eslint-config-next"

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".yarn/**", ".next/**", "node_modules/**"],
  },
]

export default eslintConfig
