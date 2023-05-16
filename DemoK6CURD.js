import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const names = ['Shivam', 'Akash', 'Aditya', 'Kajal']; // Array of possible names
const jobs = ['Engineer', 'Developer', 'Designer', 'Tester']; // Array of possible jobs

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Ramp-up to 10 VUs over 1 minute
    { duration: '2m', target: 10 }, // Stay at 10 VUs for 2 minutes
    { duration: '1m', target: 0 }, // Ramp-down to 0 VUs over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'], // Set a threshold for the response time to be less than 500 milliseconds for 95% of the requests
  },
};

const myCustomTrend = new Trend('myCustomTrend'); // Initialize the custom trend that we'll use to track response times

export default function () {
  // Generate random user data
  const randomIndex = Math.floor(Math.random() * names.length);
  const userName = names[randomIndex];
  const userJob = jobs[randomIndex % jobs.length];

  // Create operation
  const createPayload = JSON.stringify({
    name: userName,
    job: userJob,
  });
  const createHeaders = { 'Content-Type': 'application/json' };
  const createResponse = http.post('https://reqres.in/api/users', createPayload, { headers: createHeaders });
  console.log("Created user",createResponse.json())
  // Record the response time for the custom trend
  myCustomTrend.add(createResponse.timings.duration);

  // Read operation
  const userId = (createResponse.json().id)%7;
  const readResponse = http.get(`https://reqres.in/api/users/${userId}`);
  console.log("Read user",readResponse.json())
  // Record the response time for the custom trend
  myCustomTrend.add(readResponse.timings.duration);

  // Update operation
  const updatePayload = JSON.stringify({
    name: `${userName} (Updated)`,
    job: `${userJob} (Updated)`,
  });
  const updateHeaders = { 'Content-Type': 'application/json' };
  const updateResponse = http.put(`https://reqres.in/api/users/${userId}`, updatePayload, { headers: updateHeaders });
  console.log("Updated user",updateResponse.json())
  // Record the response time for the custom trend
  myCustomTrend.add(updateResponse.timings.duration);

  // Delete operation
  const deleteResponse = http.del(`https://reqres.in/api/users/${userId}`);
  console.log("Deleted user")
  // Record the response time for the custom trend
  myCustomTrend.add(deleteResponse.timings.duration);

  sleep(1);
}

export function teardown() {
  // Output the custom trend data at the end of the test
  console.log('MyCustomTrend:', JSON.stringify(myCustomTrend));
}

export function handleSummary(data) {
  console.log('HTML Report is generated')
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

