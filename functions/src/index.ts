import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import {defineString} from "firebase-functions/v2/params";

const sendChatIDConfig = defineString("TARGET_CHAT_ID");

// give us the possibility of manage request properly
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// our single entry point for every message
app.post("/", async (req, res) => {
  /*
      You can put the logic you want here
      the message receive will be in this
      https://core.telegram.org/bots/api#update
    */
  const isTelegramMessage = req.body &&
        req.body.message &&
        req.body.message.chat &&
        req.body.message.chat.id &&
        req.body.message.from &&
        req.body.message.from.first_name &&
        req.body.message.text;

  if (isTelegramMessage) {
    const destChatID = sendChatIDConfig.value();
    const chatID = req.body.message.chat.id;
    if (chatID == destChatID) {
      return;
    }
    const text:string = req.body.message.text.trim();
    if (text.startsWith("/")) {
      switch (text.substring(1)) {
        case "help":
        case "start":
          return res.status(200).send({
            method: "sendMessage",
            chat_id: chatID,
            text: "Просто напиши сообщение, я перешлю его в Doodle",
          });
        default:
          return res.status(200).send({
            method: "sendMessage",
            chat_id: chatID,
            text: "Неизвестная команда, нажми /start или /help для помощи",
          });
      }
    }
    return res.status(200).send({
      method: "sendMessage",
      chat_id: destChatID,
      text: text,
    });
  }

  return res.status(200).send({status: "not a telegram message"});
});
// this is the only function it will be published in firebase
export const router = functions.runWith({
  minInstances: 1,
  memory: "128MB",
  timeoutSeconds: 15,
  secrets: [sendChatIDConfig.name],
}).https.onRequest(app);
