const Category = require("./category");
const Product = require("./product");

Category.hasMany(Product, { foreignKey: "id", as: "products" });
Product.belongsTo(Category, { foreignKey: "category", as: "categoria" });
