# K6WithPostman

This repository demonstrates how to use K6, an open-source load testing tool, with Postman. It includes a converted K6 script generated from a Postman collection.

## Introduction

K6WithPostman provides an example of how to convert a Postman collection into a K6 load testing script. The converted script allows you to simulate load and test the performance of your APIs using K6.

## Getting Started

### Prerequisites

Before running the K6 assignments, ensure that you have the following prerequisites:

- [K6](https://k6.io/docs/getting-started/installation/): Install K6 on your local machine.
- [Postman](https://www.postman.com/downloads/) - Install Postman to import and manage the Postman collection.
- [Pstman To K6 Tool](https://k6.io/blog/load-testing-with-postman-collections/) - Install the postman-to-k6 tool:
            
        sudo npm install -g @apideck/postman-to-k6


## Instructions

#### 1. Clone the repository:
 
        git clone https://github.com/shivamknoldus1869/K6WithPostman.git
 
#### 2.Navigate to the assignments folder:

       cd K6WithPostman/
        
### If you want to build new script.js file from given collection.json file then go with step 3 and 4 otherwise jump on step 5
#### 3. Convert your exported Postman collection to k6 script:
  
       postman-to-k6 CURD.postman_collection.json -o k6-script.js
  
#### 4. Configure the K6 script:
 Open the k6script.js file in the root directory.
 Customize the script according to your load testing requirements. You can modify the endpoints, data payloads, and assertions based on your API's specifications.  
      
#### 5. Run the k6-script.js file
 
        k6 run K6-script.js
#### 6.(Optional) I have also given a DemoK6CURD.js , if want to execute

        k6 run DemoK6CURD.js
#### 6.View the results:
 After the load test completes, an HTML report will be generated as result.html and save in your local.
 You can find a summary of the test results in the console output.

Note: The HTML report generation is handled automatically by the handleSummary function in the K6 script.
 ## Submitted To
     Sparsh Bhardwaj
 ## Authors
      Shivam Singh

