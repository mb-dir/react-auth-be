const { format } = require("date-fns");
const uuid = require("uuid").v4;

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  console.log(logItem);

  try {
    const filePath = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(filePath)) {
      await fsPromises.mkdir(filePath);
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
  logEvents(message, "reqLog.txt");
  console.log(message);
  next();
};

module.exports = { logger, logEvents };
