var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

console.log("Hello!");

model = Alloy.M("hello", exports.definition, []);

collection = Alloy.C("hello", exports.definition, model);

exports.Model = model;

exports.Collection = collection;