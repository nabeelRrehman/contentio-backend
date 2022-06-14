const express = require("express");
const router = express.Router();
const { TokenVerification } = require("../../Middleware");
const createKeyword = require("./createKeyword");
const getKeywords = require("./getKeyword");
const updateKeywordStatus = require("./updateKeywordStatus");
const updateKeywordTitle = require("./updateTitles");
const { body, param } = require("express-validator");
const { ValidationErrorHandler } = require("../../Handlers");
const {
  keywords,
  project,
  keywordStatus,
  recommendedTitle,
} = require("../../Handlers/ErrorMessages");
const { ValidationObjectId } = require("../../Handlers");

// ROUTES * /api/keyword/

router.post(
  "/",
  [
    TokenVerification,
    body("keywords").isArray().withMessage(keywords),
    body("projectId").notEmpty().withMessage(project),
    body("author").customSanitizer(ValidationObjectId),
    ValidationErrorHandler,
  ],
  createKeyword
);

router.get(
  "/:projectId",
  [TokenVerification, param("projectId").customSanitizer(ValidationObjectId)],
  getKeywords
);

router.put(
  "/status",
  [
    TokenVerification,
    body("projectId").customSanitizer(ValidationObjectId),
    body("keywordId").customSanitizer(ValidationObjectId),
    body("keyword").customSanitizer(ValidationObjectId),
    body("recommendedTitleId").customSanitizer(ValidationObjectId),
    body("status").notEmpty().withMessage(keywordStatus),
  ],
  updateKeywordStatus
);

router.put(
  "/title",
  [
    TokenVerification,
    body("projectId").customSanitizer(ValidationObjectId),
    body("keywordId").customSanitizer(ValidationObjectId),
    body("keyword").customSanitizer(ValidationObjectId),
    body("recommendedTitleId").customSanitizer(ValidationObjectId),
    body("title").notEmpty().withMessage(recommendedTitle),
  ],
  updateKeywordTitle
);

module.exports = router;
