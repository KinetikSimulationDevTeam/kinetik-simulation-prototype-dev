# Kinetik Simulation
Kinetik Simulation is a web application that utilizes monte-carlo forecasting model to support enterprise revenue growth by optimizing go-to-market strategies through software.

![Kinetik Simulation Application View](./src/Images/KinetikSImulationView.png)

## How to Access this Amplify App on the web:

Simply open the following link and upload a CSV file with the appropriate format:

https://main.d2bkww882j30jj.amplifyapp.com/

## Our group project webpage hosted in TarHeels.live:
https://tarheels.live/comp523s23teaml/

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

### Start With Development Server

1. Open a terminal or command prompt on your local machine.
2. Navigate to the cloned repository directory using the command `cd`.
3. Start the development server using the appropriate command.
   
    ```
    npm start
    ```

4. Wait for the development server to start. Once started, you can view the project in your web browser by navigating to the appropriate URL, typically `http://localhost:3000`.

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
