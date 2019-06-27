const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.setCustomClaims = functions.https.onCall((data, context) => {
  // get user and add custom claim ( master )
  return admin
    .auth()
    .setCustomUserClaims(data.uid, data.claims)
    .then(() => {
      return {
        message: `Success, ${data.name} is now claims ${data.claims}`
      };
    })
    .catch(error => {
      return error;
    });
});
