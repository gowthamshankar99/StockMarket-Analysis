const AWS = require('aws-sdk');
const dynamodb = AWS.dynamodb();
exports.handler = (event, context, callback) => {    
    var params = {
  ExpressionAttributeValues: {
   ":a": {
     S: "GOOG"
    }
  }, 
  FilterExpression: "Ticker = :a",
  TableName: "stockPrice"
 };
 dynamodb.scan(params, function(err, data) {
   if (err) 
   {
        Console.log("Error while getting data from Dynamo db table " + err);
   }
   else     
   {
       console.log("succesful retrieval of the data" + data);           
   }
 });
    
};