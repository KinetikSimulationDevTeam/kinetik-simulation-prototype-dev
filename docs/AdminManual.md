# Admin Manual

## Introduction
Many large enterprises struggle to grow their business because they lack insight into the constraining factors in their go-to market models. Go-to market models cross multiple functions including Sales, Marketing, Sales Operations, Business Partners, and Delivery. Kinetik’s solution provides scenario analysis to support go-to market optimization through a proprietary set of pipeline velocity metrics, sophisticated predictive analytics and simulation, and a user experience that combines animated simulation results and dynamic visualization of the model. The proprietary opportunity velocity metrics are calculated through the comparison of opportunity states in an automated comparison of historical weekly views extracted from leading CRM systems including Salesforce, Microsoft, and SugarCRM.

The model produces superior forecasts through cluster analysis of opportunities to identify opportunity attributes (e.g. identification channel, seller community, marketing tactic, prospect industry, etc) with similar opportunity progression profiles. These clusters, “traunches,” become the foundation of the forecasting engine and a unique go-to market profile is developed through an automated machine learning method that assesses week by week changes of a series of historical pipeline snapshots. The solution additionally supports executive level dashboards and simulation visualizations that allow scenario analysis to be executed in real-time without requiring a detailed understanding of the underlying data science and velocity statistics.

## Overview
We developed a web application that utilizes monte-carlo forecasting model to support enterprise revenue growth by optimizing go-to-market strategies through software. With our application, users can upload their data, create scenarios and visualize the impact of go-to-market model changes on the opportunity pipeline in the application.

## Purpose

Our project aims to solve several problems faced by large enterprises in optimizing their go-to-market strategies and improving revenue growth. These problems include:

1. Lack of insight into the constraining factors in their go-to-market models.
Inability to cross multiple functions including Sales, Marketing, Sales Operations, Business Partners, and Delivery.

2. Poor forecasting accuracy due to a lack of visibility into opportunity velocity metrics.

3. Difficulty in identifying opportunity attributes and developing a unique go-to-market profile.
4. Lack of real-time scenario analysis capabilities.

5. Complexity of underlying data science and velocity statistics that make it challenging for executives to understand and use the information effectively.

By developing a web application that utilizes monte-carlo forecasting model and combines animated simulation results and dynamic visualization of the model, this project aims to address these problems and provide enterprises with a comprehensive solution for optimizing their go-to-market strategies and improving revenue growth.

## How to Access this Amplify App on the web:

Simply open the following link and upload a CSV file with the appropriate format:

https://main.d2bkww882j30jj.amplifyapp.com/

# Running the app locally
## Getting Started

### Cloning the Keinetik Simulation project

1. Open your GitHub repository in a web browser and locate the green "Code" button in the top right corner of the page.

2. Click on the "Code" button to open a dropdown menu.

3. From the dropdown menu, select the "HTTPS" option to obtain the repository URL in HTTPS format.

4. Copy the repository URL to the clipboard.

5. Open a terminal or command prompt on your local machine.

6. Navigate to the directory where you want to clone the repository using the command `cd` followed by the directory path.

7. Type the following command to clone the repository to your local machine:

```
git clone <https://github.com/TaoHuang0/Kinetik.git>
```

8. Press Enter to execute the command. Git will download the repository to your local machine.

9. After the cloning process is complete, navigate to the cloned repository directory using the command `cd`.

10. Now, you can install the project dependencies using the appropriate package manager such as npm or yarn.

### Installation

1. Open a terminal or command prompt on your local machine.
2. Navigate to the cloned repository directory using the command `cd`.
3. Install the project dependencies using `npm` and `yarn`.
   
    ```
    npm install
    yarn install
    ```

4. Wait for the installation process to complete. Once completed, you can run the project locally on your machine.

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

Navigate to the `IAM Dashboard`.

Click on `Users` in the left-hand menu.

Click on your user name to open your user details.

Click on the `Security credentials` tab.

Click on `Create access key` to create a new access key.

Download the access key file or copy the access key ID and secret access key.

### Running This Amplify App Locally

To run your Amplify app locally using AWS Access Keys, follow these steps:

1. Clone your Amplify app's repository to your local machine.

2. Open a terminal window and navigate to the root directory of your app.

3. Run 
```
amplify init
```
to initialize the Amplify project.

4. Run
```
amplify configure
```
to configure your AWS Access Keys. Enter the access key ID and secret access key that you obtained earlier, and choose the appropriate region for your app.

Run amplify push to deploy your app's backend resources to AWS.

### Start With Development Server

1. Open a terminal or command prompt on your local machine.
2. Navigate to the cloned repository directory using the command `cd`.
3. Start the development server using the appropriate command.
   
```
npm start
```

4. Wait for the development server to start. Once started, you can view the project in your web browser by navigating to the appropriate URL, typically `http://localhost:3000`.

Your app should now be running locally and using your AWS resources. If you encounter any issues, consult the Amplify documentation or reach out to the Amplify community for support.

For how to use the Kinetik Simulation Application, please refers to the [User Manual](./UserManual.md) for more information.
