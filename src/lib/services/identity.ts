import { api } from "@/lib/api";
import type { IdentityStatus, MetaMapConfig } from "@/types";

export function fetchIdentityStatus(): Promise<IdentityStatus> {
  return api<IdentityStatus>("/api/v1/identity/status/");
}

export function fetchMetaMapConfig(): Promise<MetaMapConfig> {
  return api<MetaMapConfig>("/api/v1/identity/metamap/config/");
}
