"use strict";
//environment variable => can be used for API key
//localhost is for running on my local machine
exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost/best-books-blog";
  // "mongodb://c-bert:World3ide2891*@ds249942.mlab.com:49942/books";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-best-books-blog";
exports.PORT = process.env.PORT || 8080;