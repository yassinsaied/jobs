const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route GET api/profiles/me
// @desc  get current user
// @access Private

router.get("/me", auth, async (req, res) => {
  try {
    // console.log(req.user);
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "email"]
    );
    // console.log(profile);
    if (!profile) {
      res
        .status(400)
        .json({ errorMessage: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route Post api/profiles
// @desc  Create & Update Profiles
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("status").not().isEmpty().withMessage("Your Stutus is required"),
      check("skills").not().isEmpty().withMessage("Your Skills  is required"),
    ],
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // buldin pofile object
    const profilePayload = {
      user: req.user.id,
      status: req.body.status,
      skills: req.body.skills.split(","),
      sociale: {},
    };
    req.body?.company && (profilePayload.company = req.body.company);
    req.body?.phone && (profilePayload.phone = req.body.phone);
    req.body?.website && (profilePayload.website = req.body.website);
    req.body?.location && (profilePayload.location = req.body.location);
    req.body?.youtube && (profilePayload.sociale.youtube = req.body.youtube);
    req.body?.instagrame &&
      (profilePayload.sociale.instagrame = req.body.instagrame);

    req.body?.linkidin && (profilePayload.sociale.linkidin = req.body.linkidin);
    req.body?.github && (profilePayload.sociale.github = req.body.github);
    req.body?.facbook && (profilePayload.sociale.facbook = req.body.facebook);
    Object.keys(profilePayload.sociale).length === 0 &&
      delete profilePayload.sociale;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Update Profile

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          profilePayload,
          { new: true }
        );

        // Create Profile
      } else {
        profile = new Profile(profilePayload);
        await profile.save();
      }

      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

// @route GET api/profiles
// @desc  get All Profiles
// @access public

router.get("/", async (req, res) => {
  try {
    const allProfiles = await Profile.find().populate("user", [
      "name",
      "email",
    ]);
    res.json(allProfiles);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route GET api/profiles/:user_id
// @desc  get profile By User ID
// @access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "email"]);
    if (!profile) {
      res.status(400).json({ errorMessage: "this user don't have profile" });
    }

    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ errorMessage: "this Id is not valid" });
    }

    res.status(500).send("server error");
  }
});

// @route GET api/profiles/:user_id
// @desc  get profile By User ID
// @access private

router.put("/deactivate", auth, async (req, res) => {
  try {
    // Desactivate profile by User ID

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { active: false }
      );
      res.json({ message: "profile removed" });
    } else {
      res.status(400).json({ errorMessage: "this user don't have profile" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route Put api/profiles/experiences
// @desc  add experiences to profiles
// @access private

router.put(
  "/experiences",
  [
    auth,
    [
      check("experiences.*.title")
        .not()
        .isEmpty()
        .withMessage("title of experience is required"),
      check("experiences.*.company")
        .not()
        .isEmpty()
        .withMessage("company of experience is required"),
      check("experiences.*.location")
        .not()
        .isEmpty()
        .withMessage("Start date of experience is required"),
      check("experiences.*.begin")
        .not()
        .isEmpty()
        .withMessage("Start date of experience is required")
        .isDate()
        .withMessage('Start Date mast be fomat "yyyy-mm-dd"'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      req.body.experiences.map((exp) => {
        profile.experiences.unshift(exp);
      });

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.send("Server Error");
    }
  }
);

// @Route Delete api/profiles/experiences/:id_experience
// @Desc  Delete exprience
//@access private

router.put("/experiences/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      const exp = profile.experiences.find(
        (exp) => exp._id.toString() == req.params.exp_id
      );

      if (exp) {
        profile.experiences.pull({
          id: req.params.exp_id,
        });
        await profile.save();
        res.json(profile);
      } else {
        res.status(400).json({ errorMessage: "experience doesn't existe" });
      }
    } else {
      res.status(400).json({ errorMessage: "this user  doesn't have profile" });
    }
  } catch (error) {
    res.send("Server Error");
  }
});

// @route Put api/profiles/educations
// @desc  add experiences to profiles
// @access private

router.put(
  "/educations",
  [
    auth,
    [
      check("educations.*.school")
        .not()
        .isEmpty()
        .withMessage("school is required"),
      check("educations.*.degree")
        .not()
        .isEmpty()
        .withMessage("Degree is required"),
      check("educations.*.fieledofstudy")
        .not()
        .isEmpty()
        .withMessage("Fieled of study is required"),
      check("educations.*.beginstudy")
        .not()
        .isEmpty()
        .withMessage("Start date of eductaion is required")
        .isDate()
        .withMessage("Start date is not valid format of date"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        req.body.educations.map((educ) => {
          profile.eduction.unshift(educ);
        });
        await profile.save();
        res.json(profile);
      } else {
        res.status(400).json({ errorMessage: "profile not found" });
      }
    } catch (error) {
      res.send("Server Error");
    }
  }
);

// @rout Delete api/profile/education/:id_educ
// description delete eduction
//access private

router.put("/educations/:id_educ", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      const eduction = profile.eduction.find(
        (educ) => educ._id.toString() === req.params.id_educ
      );
      if (eduction) {
        console.log(req.params.id_educ);
        profile.eduction.pull({
          id: req.params.id_educ,
        });
        await profile.save();
        res.json({ message: "education deleted" });
      } else {
        res.status(400).json({ errorMessage: " this educatin  NotFound" });
      }
    } else {
      res.status(400).json({ message: "profile NotFound" });
    }
  } catch (error) {}
});

// @rout Update api/profile/updatemany
// description update many profiles from datatable
//access private

router.put(
  "/updatemany",
  [
    auth,
    [
      check("profiles.*.userId")
        .not()
        .isEmpty()
        .withMessage("identifier of user is required for update"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    }

    try {
      const profilesToUpdate = req.body.profiles;
      const updatedData = [];

      for (const profileToUpdate of profilesToUpdate) {
        const {
          userId,
          user: userToupdate,
          profile: profileToupdate,
        } = profileToUpdate;

        const user = await User.findByIdAndUpdate(userId, userToupdate, {
          new: true,
        });

        if (!user) {
          res.status(400).json({ message: "user Not ound" });
        } else {
          if (!user.profile && profileToupdate) {
            const profile = new Profile(profileToupdate);
            await profile.save();
          }

          if (user.profile && profileToupdate) {
            Object.assign(user.profile, profileToupdate.profile);
            await user.profile.save();
          }

          updatedData.push(profileToUpdate);
        }
      }

      res.status(200).json({ message: "users updatetd", updatedData });
    } catch (error) {
      if (error.kind == "ObjectId") {
        return res
          .status(400)
          .json({ errorMessage: "you have many Ids of users not valid" });
      }

      res.status(500).send("server error");
    }
  }
);

module.exports = router;
