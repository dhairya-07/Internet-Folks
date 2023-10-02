require('dotenv').config({ path: './config.env' });
const express = require('express');
const sequelize = require('./db');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/roleRoutes');
const communityRouter = require('./routes/communityRoutes');
const memberRouter = require('./routes/memberRoutes');
const User = require('./models/User');
const Role = require('./models/Role');
const Community = require('./models/Community');
const Member = require('./models/Member');

const app = express();

sequelize
  .sync({ models: [User, Role] })
  .then(() => {
    sequelize.sync({ models: [Community, Member] });
    console.log('DB connection success');
    app.listen(3002, () => {
      console.log('Server running on port:', 3002);
    });
  })
  .catch((err) => {
    console.log('Error:', err);
  });

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/community', communityRouter);
app.use('/api/v1/member', memberRouter);

app.use(globalErrorHandler);
