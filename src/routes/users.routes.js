const express = require("express");

const controller = require("../controllers/users.controller");
const asyncHandler = require("../utils/asyncHandler");

const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");

const userValidator = require("../validators/user.validator");

const router = express.Router();

/*********************************
 * USER PROFILE
 *********************************/

router.get(
  "/profile",

  /*
    #swagger.tags = ['User Profile']
    #swagger.summary = 'Get current user profile'

    #swagger.security = [{
      "BearerAuth":[]
    }]
  */

  authenticate,
  asyncHandler(controller.getUserProfile),
);

router.put(
  "/profile",

  /*
    #swagger.tags = ['User Profile']

    #swagger.summary = 'Update current user profile'

    #swagger.description =
    'Updates user personal information. Email and role cannot be changed.'

    #swagger.security = [{
      "BearerAuth":[]
    }]


    #swagger.parameters['body'] = {
      in:'body',
      required:true,
      schema:{
        firstName:"John",
        lastName:"Doe",
        phoneNumber:"+243850000000",
        profileImage:"https://example.com/avatar.jpg"
      }
    }

  */

  authenticate,
  userValidator.updateProfileValidationRules(),
  validate,
  asyncHandler(controller.updateProfile),
);

router.put(
  "/change-password",

  /*
    #swagger.tags = ['User Profile']

    #swagger.summary = 'Change password'

    #swagger.security = [{
      "BearerAuth":[]
    }]


    #swagger.parameters['body'] = {
      in:'body',
      required:true,
      schema:{
        currentPassword:"OldPassword123",
        newPassword:"NewPassword123",
        confirmPassword:"NewPassword123"
      }
    }

  */

  authenticate,
  userValidator.changePasswordValidationRules(),
  validate,
  asyncHandler(controller.changePassword),
);

module.exports = router;
