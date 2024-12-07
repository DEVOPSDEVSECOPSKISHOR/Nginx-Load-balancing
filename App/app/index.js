const express = require("express");
const app = express();

// Set the environment variable for appid if available
const appid = process.env.APPID || "defaultAppId";

// Route for the home page ("/")
app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Home Page - ${appid}</title>
                <!-- Include Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container mt-5">
                    <h1 class="text-primary">Welcome to the Home Page</h1>
                    <p>This is the homepage of appid: <strong>${appid}</strong></p>
                    <p>Feel free to explore the other pages:</p>
                    <ul>
                        <li><a href="/app1" class="btn btn-link">App1 Page</a></li>
                        <li><a href="/app2" class="btn btn-link">App2 Page</a></li>
                        <li><a href="/admin" class="btn btn-link">Admin Page</a></li>
                    </ul>
                </div>
                <!-- Include Bootstrap JS and dependencies -->
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </body>
        </html>
    `);
});

// Route for the app1 page ("/app1")
app.get("/app1", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>App1 Page - ${appid}</title>
                <!-- Include Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container mt-5">
                    <h1 class="text-success">Welcome to App1 Page</h1>
                    <p>This is the App1 page of appid: <strong>${appid}</strong></p>
                    <p>Explore the app further or go back to the <a href="/" class="btn btn-primary">Home Page</a></p>
                </div>
                <!-- Include Bootstrap JS and dependencies -->
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </body>
        </html>
    `);
});

// Route for the app2 page ("/app2")
app.get("/app2", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>App2 Page - ${appid}</title>
                <!-- Include Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container mt-5">
                    <h1 class="text-warning">Welcome to App2 Page</h1>
                    <p>This is the App2 page of appid: <strong>${appid}</strong></p>
                    <p>Explore the app further or go back to the <a href="/" class="btn btn-primary">Home Page</a></p>
                </div>
                <!-- Include Bootstrap JS and dependencies -->
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </body>
        </html>
    `);
});

// Route for the admin page ("/admin")
app.get("/admin", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Admin Page - ${appid}</title>
                <!-- Include Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container mt-5">
                    <h1 class="text-danger">Admin Page</h1>
                    <p>This is the Admin page of appid: <strong>${appid}</strong></p>
                    <p>Access to the admin page is restricted. <a href="/" class="btn btn-primary">Go to Home</a></p>
                </div>
                <!-- Include Bootstrap JS and dependencies -->
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </body>
        </html>
    `);
});

// Start the server
const port = 9999;
app.listen(port, () => {
    console.log(`AppID: ${appid} is listening on port ${port}`);
});
