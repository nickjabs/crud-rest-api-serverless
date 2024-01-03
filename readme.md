
 

<body>
  <h1>Serverless Notes Application</h1>
  <p>
    This project is a serverless application built using the Serverless Framework on AWS. It involves managing notes within a DynamoDB table and exposes several functionalities via HTTP endpoints.
  </p>
  <img src="../screens/crud.jpg" alt="CRUD Operations" />
  <p>
    It utilizes AWS Lambda functions to handle HTTP events triggered by API Gateway. It interacts with DynamoDB using the AWS SDK's DocumentClient to perform CRUD operations on the 'notes' table. Additionally, it defines IAM roles and permissions for these functions to access the DynamoDB resources securely.
  </p>
</body>
</html>
