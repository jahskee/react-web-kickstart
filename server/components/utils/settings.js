/*jshint esversion: 6 */
// Global settings are configured here
const settings = {
    company_name: "Contacts Application",
    app_name: "NodeJS Express",
    SERVER_PORT: process.env.APP_PORT, 
    API_HOST: process.env.APP_API_HOST,
};
console.log("\nConfigurations:");
console.log(settings);

module.exports = settings;