/**
 * Admin API key middleware.
 * Checks the x-admin-key header against the ADMIN_API_KEY env variable.
 * Attach this to any route that should be restricted to admins.
 */
const adminAuth = (req, res, next) => {
  const key = req.headers['x-admin-key'];

  if (!key || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized — valid admin key required.',
    });
  }

  next();
};

module.exports = adminAuth;
