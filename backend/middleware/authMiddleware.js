// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User"); // <-- UNCOMMENT THIS LINE! (Make sure User model exists and is correct)

const protect = async (req, res, next) => { // <-- MAKE THIS FUNCTION ASYNC!
    let token;

    // Check if token exists and starts with 'Bearer '
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            // Extract the token string (remove 'Bearer ')
            token = req.headers.authorization.split(" ")[1];

            // Verify the token using your JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

            // Attach the decoded JWT payload to req.user initially
            // And then fetch the full user object from the database, excluding the password
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                // If user not found in DB after token verification
                return res.status(401).json({ error: "Not authorized, user not found" });
            }

            next(); // Call next() to pass control to the next middleware or route handler
        } catch (error) {
            console.error("Authentication Error:", error.message);
            return res.status(401).json({
                error: "Not authorized, token failed"
            });
        }
    } else {
        return res.status(401).json({
            error: "No token provided or invalid format"
        });
    }
};

// New admin middleware function
const admin = (req, res, next) => {
    // Assumes req.user is populated by the 'protect' middleware
    // and that the User model has an 'isAdmin' boolean field.
    if (req.user && req.user.isAdmin) {
        next(); // User is an admin, proceed
    } else {
        return res.status(403).json({ // 403 Forbidden
            error: "Not authorized as an administrator"
        });
    }
};

// Export both middleware functions as properties of an object
module.exports = { protect, admin }; 