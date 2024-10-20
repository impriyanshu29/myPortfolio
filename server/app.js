import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoute from './Routes/auth.routes.js';
import introRoute from './Routes/intro.routes.js';
import educationRoute from './Routes/education.routes.js'
import projectRoute from './Routes/project.routes.js';
import certificateRoute from './Routes/certificate.routes.js';
import experienceRoute from './Routes/experience.routes.js';
import messageRoute from './Routes/message.routes.js';
const app = express();

app.use(express.json());
// The express.json() middleware parses incoming requests with JSON payloads.
//parses means it takes a string and converts it into a JavaScript object.

// The express.urlencoded() middleware parses incoming requests with URL-encoded payloads.
//url encoded payload means that the data will be sent in the URL itself.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Specify your frontend domains (Vercel and custom domain)
const allowedOrigins = [
  'https://my-portfolio-8onw1f64y-priyanshu-tiwaris-projects.vercel.app',
  'https://myportfolio-1-a574.onrender.com',
  'https://www.priyanshutiwari.me',
  'http://localhost:5173',
  
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Enable cookies and other credentials if needed
};

// Enable CORS for the allowed origins
app.use(cors(corsOptions));



app.use('/api/auth',authRoute);
app.use('/api/intro',introRoute);
app.use("/api/edu",educationRoute);
app.use("/api/project",projectRoute);
app.use("/api/certificate",certificateRoute);
app.use("/api/experience",experienceRoute);
app.use("/api/message",messageRoute);

// // Serve static files from the React app
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/client/dist')));

// // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client','dist', 'index.html')); // Adjust the path
// });

app.use((err,req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;