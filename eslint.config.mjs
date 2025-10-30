import nextConfig from "eslint-config-next"

const eslintConfig = [
  {
    ignores: [".yarn/**", ".next/**", "node_modules/**"],
  },
  ...nextConfig,
]

export default eslintConfig
