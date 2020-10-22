import fetch from "node-fetch";


exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  
  const fund = body.data.object.card.metadata.fid;
  const id = body.data.object.id;
  const amount = body.data.object.pending_request.amount;
  
  const API_ENDPOINT1 = "https://firestore.googleapis.com/v1/projects/fundsy-sandbox/databases/(default)/documents/funds/" + fund;
  const API_ENDPOINT2 = API_ENDPOINT1 + "?updateMask.fieldPaths=fundsAvailable";

  let balance;
  let option = "decline"
  
  await fetch(API_ENDPOINT1, { headers: { "Accept": "application/json" } })
  .then(response => response.json())
  .then(function (data) {
    balance = data.fields.fundsAvailable.integerValue - data.fields.fundsPending.integerValue;
    if (balance >= amount)
    {
      option = "approve";
    }
  })
  .catch(error => ({ statusCode: 422, body: String(error) }));
  
  await fetch("https://api.stripe.com/v1/issuing/authorizations/" + id + "/" + option, {
  headers: {
    Authorization: "Basic c2tfdGVzdF81MUhCVzduS01PVzdyYXZTV2k2aWFNZmVDNXV5bk1nYTVRdjhmMEFNY0xBajQxbTZ2czZXeU5CaHhrcVBoVU9aRFE3VGUwUkxaaE90SlNEVHFaZmtNVE14dDAwdWNTclJ6Slg6"
  },
  method: "POST"
})
  
//   if (option == "approve"){
//       await fetch(API_ENDPOINT2, { 
//         headers: { "Content-Type": "application/json" },
//         method: "PATCH", 
//         body: JSON.stringify({ "fields": { "fundsAvailable": { "integerValue": balance - amount }}})
//       })
//   }
  
  return {
      statusCode: 200,
      body: option + "d"
    }
};
