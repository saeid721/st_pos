const { DEV, VITE_LOCAL_API_URL, VITE_PROD_API_URL } = import.meta.env;

const envConfig = {
	apiUrl: DEV ? VITE_LOCAL_API_URL : VITE_PROD_API_URL,
};

export default envConfig;
