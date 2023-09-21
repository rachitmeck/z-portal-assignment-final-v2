const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const app = express();
const axios = require("axios");
const fs = require("fs");

require("./config/passport");

app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "login")));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Read the content of the header.ejs file
const headerContent = fs.readFileSync(
  path.join(__dirname, "views", "header.ejs"),
  "utf-8"
);
// Read the content of the footer.ejs file
const footerContent = fs.readFileSync(
  path.join(__dirname, "views", "footer.ejs"),
  "utf-8"
);

// Read the content of the main.ejs file
const homeContent = fs.readFileSync(
  path.join(__dirname, "views", "main.ejs"),
  "utf-8"
);

// To check user logged in or not
function isLoggedIn(req, res, next) {
  req.user
    ? next()
    : res
        .status(401)
        .sendFile(path.join(__dirname, "login", "unauthorize.html"));
}

// Used to catch after logout, no back button.
function preventCaching(req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  next();
}

//Goggle login authenticate block
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login", "login.html"));
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/welcome/home",
    failureRedirect: "/auth/google/failure",
  })
);

// Upon successful login, in home page and data will be fetched.
app.get("/welcome/home", isLoggedIn, preventCaching, async (req, res) => {
  try {
    // Get the page number from the query parameters, default to 1 if not provided
    const page = parseInt(req.query.page) || 1;
    const perPage = 6; // Number of items per page (as per the API response)
    //console.log(req);
    // Make a GET request to the external API with the specified page number
    const apiResponse = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    // Extract pagination information from the API response
    const {
      page: apiPage,
      per_page: apiPerPage,
      total,
      total_pages,
      data: users,
    } = apiResponse.data;

    // Define the maskEmail function
    function maskEmail(email) {
      return "******"; // Masked email representation
    }

    // Filter the users array to include only records that match the criteria
    const filteredUsers = users.filter((user) => {
      const { first_name, last_name } = user;
      return first_name.startsWith("G") || last_name.startsWith("W");
    });

    // Render the "home" view with paginated data, pagination information, and maskEmail function
    res.render("home", {
      users,
      users2: filteredUsers,
      displayName: req.user.displayName,
      page,
      totalPages: total_pages,
      maskEmail,
      apiPage,
      apiPerPage,
      total,
      headerContent: headerContent,
      footerContent: footerContent,
      homeContent: homeContent,
      loading: true,
    });
  } catch (error) {
    res.status(500).render("home-error");
  }
});

//Use will be logged out and the session will be destroyed
app.use("/auth/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

//If there is any login error with authenticating with google
app.use("/auth/failure", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "login", "network.html"));
  //res.send("Error in login");
});

// If user try to enter any url in bar, this will will be thrown
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "login", "404.html"));
});

// To set port to 4001
app.listen(4001, () => {
  console.log("Listin on port 4001");
});
