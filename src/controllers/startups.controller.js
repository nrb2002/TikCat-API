const startupsService = require("../services/startups.service");

// GET all startups
const getAllStartups = async (req, res, next) => {
  //#swagger.tags=["Startups Endpoints"]
  //#swagger.tags=["Get Endpoints"]
  //#swagger.summary="Get all startups"
  //#swagger.description="Pull all startups from the database. "
  try {
    const startups = await startupsService.getAllStartups();

    //Return the startups
    res.status(200).json(startups);
  } catch (error) {
    next(error);
  }
};

// GET single startup
const getSingleStartup = async (req, res, next) => {
  //#swagger.tags=["Startups Endpoints"]
  //#swagger.tags=["Get Endpoints"]
  //#swagger.summary="Get single startup"
  //#swagger.description="Pull one startup by ID from the database. "
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'startup ID',
        required: true,
        type: 'string'
  } */
  try {
    const startup = await startupsService.getSingleStartup(req.params.id);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found!",
      });
    }

    res.status(200).json(startup);
  } catch (error) {
    next(error);
  }
};

// CREATE startup
const createStartup = async (req, res, next) => {
  //#swagger.tags=["Startups Endpoints"]
  //#swagger.tags=["Post Endpoint"]
  // #swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Create a new startup"
  //#swagger.description="Insert new startup in the database. "
  /* #swagger.parameters["body"] = {
    in: "body",
    description: "New startup data",
    required: true,
    schema: {
      name: "KongoTech",
      description: "FinTech startup providing digital payment solutions",
      industry: "FinTech",
      founders: ["Baron Mobs"],
      foundedYear: 2022,location: {
        ward: "Ngiri-Ngiri",
        stake: "Kinshasa",
        commune: "Ngiri-Ngiri",
        city: "Kinshasa",
        province: "Kinshasa",
        country: "DR Congo"
      }, 
      phone: "+243810000000"
    }
} */
  try {
    const newStartup = await startupsService.createStartup(req.body);

    res.status(201).json(newStartup);
  } catch (error) {
    next(error);
  }
};

// UPDATE startup
const updateStartup = async (req, res, next) => {
  //#swagger.tags=["Startups Endpoints"]
  //#swagger.tags=["Put Endpoint"]
  // #swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Update startup info"
  //#swagger.description="Edit a specific startup and save update in database. "
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Startup ID',
        required: true,
        type: 'string'
  } */
  /* #swagger.parameters["body"] = {
        in: "body",
        description: "Update startup data",
        required: true,
        schema: {
          name: "KongoTech",
          description: "FinTech startup providing digital payment solutions",
          industry: "FinTech",
          founders: ["Baron Mobs"],
          foundedYear: 2022,
          
          location: {
            ward: "Ngiri-Ngiri",
            stake: "Kinshasa",
            commune: "Ngiri-Ngiri",
            city: "Kinshasa",
            province: "Kinshasa",
            country: "DR Congo"
          },

          phone: "+243810000000",          
          email: "info@kongotech.com",
          website: "https://kongotech.com",
          
          products: ["Mobile Wallet"],
          employees: 18,
          startupStage: "Growth",
          fundingStage: "Seed",
          turnover: [
            {
              year: 2024,
              amount: 65000
            }
          ]
        }
    } */

  try {
    const updatedStartup = await startupsService.updateStartup(
      req.params.id,
      req.body,
    );

    res.status(200).json(updatedStartup);
  } catch (error) {
    next(error);
  }
};

// DELETE startup
const deleteStartup = async (req, res, next) => {
  //#swagger.tags=["Startups Endpoints"]
  //#swagger.tags=["Delete Endpoints"]
  // #swagger.security = [{"BearerAuth": []}]
  //#swagger.summary="Delete startup"
  //#swagger.description="Delete selected startup from the database."

  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'startup ID',
        required: true,
        type: 'string'
  } */
  try {
    await startupsService.deleteStartup(req.params.id);

    res.status(200).json({
      message: "Startup deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStartups,
  getSingleStartup,
  createStartup,
  updateStartup,
  deleteStartup,
};
