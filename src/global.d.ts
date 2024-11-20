import type { TFunction } from "react-i18next";

declare global {
  export const APP_DEV_CWD: string;
  export const GIT_COMMIT_SHA: string;
  export const DEBUG: boolean;
  export const dependencies: Record<string, string>;
  export const devDependencies: Record<string, string>;
  export const README: string;
  export const pkg: IPKG;
  export type I18nKeys = Parameters<TFunction>[0];
}

export {};

export type IPKG = {
  name: string;
  type: string;
  version: string;
  private: boolean;
  homepage: string;
  repository: Repository;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  description: string;
  author: string;
};

export type Repository = {
  url: string;
  type: string;
};
