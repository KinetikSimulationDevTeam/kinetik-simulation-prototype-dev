# User Manual

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

## Get Started
To get started, make sure you are connected to the internet and open the following link: https://main.d2bkww882j30jj.amplifyapp.com/. This will take you to the Kinetik Simulation Application View.

![Kinetik Simulation Application View](./src/Images/KinetikSimulationStarted.png)

Upon opening the website, you will see a pop-up message welcoming you to Kinetik Simulation and prompting you to upload a data file to begin the simulation. Simply click the 'OK' button to exit the alert.

![Kinetik Simulation Application View](./src/Images/KinetikUplaodModule.png)

Since you have not uploaded the data file yet, the simulation has not been triggered, and all other modules are showing as empty.

To upload your data file, navigate to the right-hand side of the upload module and click the 'download template' link. This will download a CSV template file for you to fill in.

* Attention: Please follow the guidance provided in the [GUIDEANCE](./UploadFileGuidance.md) file to complete your upload file. It is essential to follow the format in the guidance file thoroughly for the application to parse your file and run the simulation.
