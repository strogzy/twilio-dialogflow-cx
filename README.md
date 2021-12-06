

# Integration with DialogFlow CX

## Setup

1. Go to GCP and download service credentials in JSON file, drop them into the `assets` folder and name it as `creds.private.json` 
2. Deploy the function to your Twilio environment:
```
twilio serverless:deploy 
```
3. Create a **Studio** Flow, perform Gather or other operations, when you want to send the text to DialogFlow, you can specify following parameters:

- `projectId` - your project ID in GCP, example  'streams-272212';
- `location` - your API location, example 'europe-west1';
- `agentId` - your agent ID in DialogFlow, example '9713ece7-ebbb-43be-ad96-4ff6184f15a1';
- `request` - message to analyse, example '{{widgets.gather_1.SpeechResult}}';
- `languageCode` - language code, example 'en';
- `sessionId` - you can create your own session key, example '{{trigger.call.CallSid}}';
- `credsAsset` - file name of your credentials file, without *private* but with `/`, example '/creds.json';