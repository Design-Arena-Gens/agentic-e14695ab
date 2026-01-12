import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [".next", "dist", "build", "coverage", "node_modules"]
  },
  ...nextConfig
];

export default config;
