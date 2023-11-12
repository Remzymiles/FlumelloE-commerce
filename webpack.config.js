const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        app: "./src/scripts/app.ts",
        sign_up: "./src/scripts/sign_up.ts",
        login: "./src/scripts/login.ts",
        product_page: "./src/scripts/product_page.ts",
        cart: "./src/scripts/cart.ts",
        profile: "./src/scripts/profile.ts",
        checkout: "./src/scripts/checkout.ts",
        order_history: "./src/scripts/order_history.ts",
    },
    output:{
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["app"],
        }),
        new HtmlWebpackPlugin({
            filename: "sign-up.html",
            template: "./src/sign-up.html",
            chunks: ["sign_up"],
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/login.html",
            chunks: ["login"],
        }),
        new HtmlWebpackPlugin({
            filename: "cart-page.html",
            template: "./src/cart-page.html",
            chunks: ["cart"],
        }),
        new HtmlWebpackPlugin({
            filename: "checkout.html",
            template: "./src/checkout.html",
            chunks: ["checkout"],
        }),
        new HtmlWebpackPlugin({
            filename: "product-page.html",
            template: "./src/product-page.html",
            chunks: ["product_page"],
        }),
        new HtmlWebpackPlugin({
            filename: "profile.html",
            template: "./src/profile.html",
            chunks: ["profile"],
        }),
        new HtmlWebpackPlugin({
            filename: "order-history.html",
            template: "./src/order-history.html",
            chunks: ["order_history"],
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 8082,
        open: true,
    },
}