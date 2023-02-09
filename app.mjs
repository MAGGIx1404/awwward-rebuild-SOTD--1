import express from "express";
import methodOverride from "method-override";
import compression from "compression";
import errorHandler from "errorhandler";
import path from "path";
import morgan from "morgan";

const __dirname = path.resolve();
const port = process.env.PORT || 9000;
const app = express();

// Express configs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middlewares
app.use(
  compression({
    level: 9
  })
);
app.use(methodOverride());
app.use(errorHandler());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

// Home page
app.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Home"
  });
});

// About page
app.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About"
  });
});

// Portfolio page
app.get("/portfolio", (req, res) => {
  return res.render("pages/portfolio", {
    title: "Portfolio"
  });
});

// Contact page
app.get("/contact", (req, res) => {
  return res.render("pages/contact", {
    title: "Contact"
  });
});

// works page
app.get("/works/:name", (req, res) => {
  const name = req.params.name;
  res.render(`pages/works/${name}`, {
    title: `${name}`
  });
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
