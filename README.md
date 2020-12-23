# AWS SES Bounces Notifications to DynamoDB

### Prereqs

Install NodeJS: https://nodejs.org/en/download/  
Install Serverless Framework: ``` npm install -g serverless ```  
Install Serverless Extension: ``` npm i serverless-iam-roles-per-function ```  
Configure AWS CLI credentials ``` aws configure ```  

### AWS Resources

Create a Standard SQS Queue.  
Go to SES and configure bounces notifications for a specific domain/address, set up bounces notifications to a new or existing SNS Topic, once configured, go to that SNS Topic and register your previously created SQS Queue as a consumer.  

### Replace parameters on the serverless conf file (serverless.yml)

Replace {account-id} with your AWS Account ID, you can find it on the top right of the AWS Console.  
Replace {queuename} with your previously create SQS Queue name.  

### Deploy

To deploy this stack, go ahead and execute: ``` npm install ``` followed by ``` sls deploy -s dev ```  
Your bounces will start to popup on a DynamoDB table created by this stack, you will be able to see the sender, reciever, reason and timestamp, you can further modify the Lambda function code to add extra fields.  
