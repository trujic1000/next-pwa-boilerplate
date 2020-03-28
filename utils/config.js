import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig() || {};

export const { BASE_URL } = publicRuntimeConfig;
