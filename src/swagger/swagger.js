const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "TikCat API Documentation",
    version: "1.0.0",
    description:
      "API documentation for TikCat, a ticketing platform built with Node.js, Express, MongoDB, Passport.js, and JWT authentication.",
  },

  host:
    process.env.NODE_ENV === "production"
      ? "tikcat-api.onrender.com"
      : "localhost:5000",

  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter JWT token as: 'Bearer' + JW Token ",
    },
  },

  definitions: {
    RegisterRequest: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "Password123",
    },

    LoginRequest: {
      email: "john@example.com",
      password: "Password123",
    },

    User: {
      _id: "68459f7e1a2f123456789abc",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "attendee",
      profileImage: "/public/images/profile.jpg",
      phoneNumber: "+243812345678",
    },

    Category: {
      _id: "68459f7e1a2f123456789abc",
      name: "Technology",
      description: "Technology related events",
    },

    Venue: {
      _id: "68459f7e1a2f123456789abc",
      name: "Kin Plaza",
      address: "Boulevard du 30 Juin",
      city: "Kinshasa",
      capacity: 500,
      contactPhone: "+243812345678",
    },

    Event: {
      _id: "68459f7e1a2f123456789abc",
      title: "Tech Summit 2026",
      description: "Annual technology conference",
      categoryId: "68459f7e1a2f123456789abc",
      venueId: "68459f7e1a2f123456789abc",
      organizerId: "68459f7e1a2f123456789abc",
      eventDate: "2026-07-15T10:00:00.000Z",
      startTime: "10:00",
      endTime: "17:00",
      ticketPrice: 50,
      totalTickets: 500,
      availableTickets: 500,
      status: "Published",
    },

    Ticket: {
      _id: "68459f7e1a2f123456789abc",
      eventId: "68459f7e1a2f123456789abc",
      attendeeId: "68459f7e1a2f123456789abc",
      ticketCode: "AB12CD34EF56",
      qrCode: "data:image/png;base64,...",
      status: "Paid",
    },

    Order: {
      _id: "68459f7e1a2f123456789abc",
      userId: "68459f7e1a2f123456789abc",
      eventId: "68459f7e1a2f123456789abc",
      quantity: 2,
      totalAmount: 100,
      paymentStatus: "Paid",
    },
  },
};

const outputFile = "./swagger.json";
const endpointFiles = ["../app.js"];

swaggerAutogen(outputFile, endpointFiles, doc);
