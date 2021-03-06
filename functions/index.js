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
        message: `Success, ${data.name} now claims ${data.claims.master} , ${
          data.claims.player
        }`
      };
    })
    .catch(error => {
      return error;
    });
});

exports.getCustomClaims = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUser(data.uid)
    .then(userRecord => {
      return userRecord.customClaims;
    })
    .catch(error => {
      return error;
    });
});
// [START recursive_delete_function]
/**
 * Initiate a recursive delete of documents at a given path.
 *
 * The calling user must be authenticated and have the custom "admin" attribute
 * set to true on the auth token.
 *
 * This delete is NOT an atomic operation and it's possible
 * that it may fail after only deleting some documents.
 *
 * @param {string} data.path the document or collection path to delete.
 */
exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB"
  })
  .https.onCall((data, context) => {
    // Only allow admin users to execute this function.
    if (!(context.auth && context.auth.token && context.auth.token.admin)) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Must be an administrative user to initiate delete."
      );
    }

    const path = data.path;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`
    );

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    return firebase_tools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token
      })
      .then(() => {
        return {
          path: path
        };
      });
  });
// [END recursive_delete_function]
