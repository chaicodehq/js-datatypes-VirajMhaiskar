/**
 * 💬 WhatsApp Message Parser
 *
 * Chintu ek WhatsApp chat analyzer bana raha hai. Usse raw WhatsApp
 * exported message line parse karni hai aur usme se date, time, sender,
 * aur message alag alag extract karna hai.
 *
 * WhatsApp export format:
 *   "DD/MM/YYYY, HH:MM - Sender Name: Message text here"
 *
 * Rules:
 *   - Date extract karo: string ke start se pehle ", " (comma-space) tak
 *   - Time extract karo: ", " ke baad se " - " (space-dash-space) tak
 *   - Sender extract karo: " - " ke baad se pehle ": " (colon-space) tak
 *   - Message text extract karo: pehle ": " ke baad (after sender) sab kuch, trimmed
 *   - wordCount: message ke words count karo (split by space, filter empty strings)
 *   - Sentiment detection (case-insensitive check on message text):
 *     - Agar message mein "😂" ya ":)" ya "haha" hai => sentiment = "funny"
 *     - Agar message mein "❤" ya "love" ya "pyaar" hai => sentiment = "love"
 *     - Otherwise => sentiment = "neutral"
 *     - Agar dono match hote hain, "funny" gets priority
 *   - Hint: Use indexOf(), substring()/slice(), includes(), split(),
 *     trim(), toLowerCase()
 *
 * Validation:
 *   - Agar input string nahi hai, return null
 *   - Agar string mein " - " nahi hai ya ": " nahi hai (after sender), return null
 *
 * @param {string} message - Raw WhatsApp exported message line
 * @returns {{ date: string, time: string, sender: string, text: string, wordCount: number, sentiment: string } | null}
 *
 * @example
 *   parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Bhai party kab hai? 😂")
 *   // => { date: "25/01/2025", time: "14:30", sender: "Rahul",
 *   //      text: "Bhai party kab hai? 😂", wordCount: 5, sentiment: "funny" }
 *
 *   parseWhatsAppMessage("01/12/2024, 09:15 - Priya: I love this song")
 *   // => { date: "01/12/2024", time: "09:15", sender: "Priya",
 *   //      text: "I love this song", wordCount: 4, sentiment: "love" }
 */
export function parseWhatsAppMessage(message) {
  // Your code here
  if(typeof message !== "string" || !message.includes("-") || !message.includes(": ")) {
    return null;
  }

  /* I WROTE THIS CODE BUT THE APPROACH WAS VERY POOR SO I ASKED CHATGPT AND IT GAVE ME THE CODE WHICH IS NOT COMMENTED ONLY FOR PARSING DATA.
    let dateArray = message.split(",", 1);
    let date = dateArray[0];
    
    let timeArray = message.split("-", 1);
    let timeString = timeArray[0];
    let splitTime = timeString.split(",");
    let time = splitTime[1];

    let senderArray = message.split(": ", 1);
    let senderString = senderArray[0];
    let senderArray2 = senderString.split("-");
    let sender = senderArray2[1];

    let messageArray = message.split(": ");
    let receivedMessage = messageArray[1];
  */

  let parts = message.split("-");

  let dateTimePart = parts[0];
  let senderMessagePart = parts[1];

  let dateTime = dateTimePart.split(",");
  let date = dateTime[0];
  let time = dateTime[1];

  let senderMessage = senderMessagePart.split(": ");
  let sender = senderMessage[0];
  let messageReceived = senderMessage[1];
  let messageWord = messageReceived.split(" ");
  let messageWordCount = messageWord.length;

  let lowerReceivedMessage = messageReceived.toLowerCase();

  let loveSentiment = lowerReceivedMessage.includes("❤") || lowerReceivedMessage.includes("love") || lowerReceivedMessage.includes("pyaar");
  let funnySentiment = lowerReceivedMessage.includes("😂") || lowerReceivedMessage.includes("haha") || lowerReceivedMessage.includes(":)");

  let sentiment;
  if(loveSentiment && funnySentiment) {
    sentiment = "funny";
  } else if(loveSentiment) {
    sentiment = "love";
  } else if(funnySentiment){
    sentiment = "funny";
  } else {
    sentiment = "neutral";
  }

  return {date: date, time: time.trim(), sender: sender.trim(), text: messageReceived, wordCount: messageWordCount, sentiment: sentiment}
  
}
