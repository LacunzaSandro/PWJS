import * as dotenv from 'dotenv';

export const getEnv = () => {
	let enviroment = process.env.npm_config_ENV || "prod";
	dotenv.config({
		override: true,
		path: `src/helper/env/.env.${enviroment}`
	});
};