exports.handler = async function(context, event, callback) {

  const {SessionsClient} = require('@google-cloud/dialogflow-cx');

  const projectId = event.projectId; // 'streams-272212';
  const location = event.location; //'europe-west1';
  const agentId = event.agentId; //'9713ece7-ebbb-43be-ad96-4ff6184f15a1';
  const query = event.request; //'Hello';
  const languageCode = event.languageCode; //'en'
  const sessionId = event.sessionId;
  const credsAsset = event.credsAsset;

  
  const keysAsset = Runtime.getAssets()[credsAsset].open();
  const keys = JSON.parse(keysAsset);
  
  const config = {
    apiEndpoint: 'europe-west1-dialogflow.googleapis.com', // should make it settable
    credentials: {
      private_key: keys.private_key,
      client_email: keys.client_email
    }
  }
  
  const client = new SessionsClient(config);
  
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
    );
  console.info(sessionPath);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };
  // const [reply] = await client.detectIntent(request);
  //   let response = "";
  //   console.log(`User Query: ${query}`);
  //   for (const message of reply.queryResult.responseMessages) {
  //     if (message.text) {
  //       console.log(`Agent Response: ${message.text.text}`);
  //       response = response.concat(" ", message.text.text);
  //     }
  //   }

  // callback(null, response );

  client.detectIntent(request)
  .then((reply)=>{
    console.log(reply);
    let response = "";
    console.log(`User Query: ${query}`);
    for (const message of reply[0].queryResult.responseMessages) {
      if (message.text) {
        console.log(`Agent Response: ${message.text.text}`);
        response = response.concat(" ", message.text.text);
      }
    }
    callback(null, response );
  })
  .catch(err=>{
    callback(err, 'Sorry an error occurred');
  })


};