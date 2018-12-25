const dotenv = require('dotenv');
dotenv.config();
module.exports={
    auth :`User ${process.env.USER}, Organization ${process.env.ORGANIZATION}, Element ${process.env.ELEMENT}`
}