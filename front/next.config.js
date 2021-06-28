// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
const withSass = require('@zeit/next-sass') // SCSS
const webpack = require("webpack");
const CompressionPlugin = require('compression-webpack-plugin'); // gz 압축(배포용)

module.exports = withSass({
    distDir: "build",
    webpack(config) {
        // console.log("config", config);
        // console.log("rules", config.module.rules[0]);
        const prod = process.env.NODE_ENV === "production";
        const plugins = [
            ...config.plugins,
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/), //모멘트 트리쉐이킹 코드
        ];
        if (prod) {
            plugins.push(new CompressionPlugin()); // main.js.gz
        }
        return {
            ...config,
            mode: prod ? "production" : "development",
            devtool: prod ? "hidden-source-map" : "eval",
            plugins,
        };
    },
});