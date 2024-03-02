const { port, env, uri } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');
const authRoutes = require('./routes/auth/authRoutes');
const hotelRoutes = require('./routes/v1/hotelRoutes');
const flightRoutes = require('./routes/v1/flightRoutes');

// Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// connect to mongo db
mongoose.connect(process.env.MONGODB_URI);

// Use auth routes
app.use('/auth', authRoutes);

// listen to requests
app.listen(port, () => console.log(`Server started on port ${port} (${env})`));

// handle hotel api requests
app.use('/api/v1/hotels', hotelRoutes);

//handle flight api requests
app.use('/api/v1/flights', flightRoutes);

module.exports = app;
