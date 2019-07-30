const Brizy = require("./Brizy");

module.exports = {
  kits: [Brizy],
  types: [
    {
      id: 0,
      name: "light",
      title: "Light",
      icon: "nc-light"
    },
    {
      id: 1,
      name: "dark",
      title: "Dark",
      icon: "nc-dark"
    }
  ],
  categories: [
    { id: 0, slug: "blank", title: "Blank", hidden: true },
    { id: 1, slug: "popup", title: "Popup" },
    { id: 2, slug: "cover", title: "Cover" },
    { id: 3, slug: "features", title: "Features" },
    { id: 4, slug: "call-to-action", title: "Call to Action" },
    { id: 5, slug: "projects", title: "Projects" },
    { id: 6, slug: "news", title: "News" },
    { id: 7, slug: "services", title: "Services" },
    { id: 8, slug: "testimonial", title: "Testimonial" },
    { id: 9, slug: "gallery", title: "Gallery" },
    { id: 10, slug: "team", title: "Team" },
    { id: 11, slug: "contact", title: "Contact" },
    { id: 12, slug: "pricing", title: "Pricing" },
    { id: 13, slug: "social", title: "Social" },
    { id: 14, slug: "map", title: "Map" },
    { id: 15, slug: "forms", title: "Forms" },
    { id: 16, slug: "slider", title: "Slider" },
    { id: 17, slug: "post", title: "Post" },
    { id: 18, slug: "blog", title: "Blog" },
    { id: 19, slug: "author", title: "Author" },
    { id: 20, slug: "content", title: "Content" },
    { id: 21, slug: "header", title: "Header" },
    { id: 22, slug: "footer", title: "Footer" }
  ]
};
