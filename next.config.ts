import type { NextConfig } from "next";
import { env } from "process";

const allowedDomains = env.REPLIT_DOMAINS
  ? env.REPLIT_DOMAINS.split(",")
  : [];

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedDomains,
};

module.exports = nextConfig;
