# Kinetik Simulation
Kinetik Simulation is a web application that utilizes monte-carlo forecasting model to support enterprise revenue growth by optimizing go-to-market strategies through software.

[embed]https://drive.google.com/file/d/1YFra8EjlHBZqoDp_MzcFXNN2pUbnEiuQ/preview[/embed]

## How to Access this Amplify App on the web:

Simply open the following link and upload a CSV file with the appropriate format:

https://main.d2bkww882j30jj.amplifyapp.com/

## How to Run this Amplify App Locally Using AWS Access Keys:

### Prerequisites:
Before you can run this Amplify app locally using AWS Access Keys, you will need to have the following:

An AWS account with appropriate permissions to access the lambda and API resources this app uses

AWS Access Keys for the account you will be using

Node.js and npm installed on your computer

The Amplify CLI installed your computer

## Setting Up Your AWS Access Keys

To set up your AWS Access Keys, follow these steps:

Log in to your AWS account.

Navigate to the IAM Dashboard.

Click on "Users" in the left-hand menu.

Click on your user name to open your user details.

Click on the "Security credentials" tab.

Click on "Create access key" to create a new access key.

Download the access key file or copy the access key ID and secret access key.

### Running This Amplify App Locally

To run your Amplify app locally using AWS Access Keys, follow these steps:

Clone your Amplify app's repository to your local machine.

Open a terminal window and navigate to the root directory of your app.

Run amplify init to initialize the Amplify project.

Run amplify configure to configure your AWS Access Keys. Enter the access key ID and secret access key that you obtained earlier, and choose the appropriate region for your app.

Run amplify push to deploy your app's backend resources to AWS.

Run npm start to start your app's frontend.

Your app should now be running locally and using your AWS resources. If you encounter any issues, consult the Amplify documentation or reach out to the Amplify community for support.
