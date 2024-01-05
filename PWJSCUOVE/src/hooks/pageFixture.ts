import { Page } from "@playwright/test";
import { Logger } from "winston";
import Assert from "./Assert";

export const fixture = {
	// @ts-ignore
	page: undefined as Page,
	logger: undefined as Logger,
	assert: undefined as Assert
};