/** @type {import("next").NextConfig} */

export default {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "",
				pathname: "/**"
			}
		]
	},
	rewrites: async () => [
		{
			source: "/api/:path*",
			destination: `http://localhost:8000/:path*`
		}
	]
};
