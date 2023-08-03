import React from 'react'
import SearchAppBar from '../Components/SearchAppBar'
import Navbar from '../Components/NavigationBar'

/* 
    Description: This component is used to display the FAQ page.

    Arguments: None

    Return Type: None
*/
const Faq = () => {
    return (
        <div>
            <SearchAppBar />
            <Navbar />
            <div id='faq-page-layout'>
                <h3 className='title'> FAQ Session </h3>
                <div>
                    <div>
                        <h5 className='title'> 1. Where can I find User Manual? </h5>
                        <p>Click <a href="https://tarheels.live/comp523s23teaml/user-manual/" target='_blank'>here</a> to see the User Manual.</p>
                    </div>
                    <div>
                        <h5 className='title'> 2. Where can I find help for creating input file? </h5>
                        <p>Click <a href="https://tarheels.live/comp523s23teaml/input-file-tutorial1/" target='_blank'>here</a> to see the File Input Tutorial.</p>
                    </div>
                    <div>
                        <h5 className='title'> 3. What is Kinetik Simulation? </h5>
                        <p>Kinetik Simulation is a web application that uses a Monte Carlo forecasting model to help large enterprises optimize their go-to-market strategies and improve revenue growth. The application provides users with insight into the constraining factors in their go-to-market models by cross-referencing multiple functions including Sales, Marketing, Sales Operations, Business Partners, and Delivery. The app uses proprietary pipeline velocity metrics, predictive analytics and simulation, and dynamic visualization of the model to create a unique go-to-market profile that is specific to the enterprise. The application supports real-time scenario analysis, executive-level dashboards, and automated machine learning methods to assess week-by-week changes in pipeline snapshots. By leveraging these features, enterprises can accurately forecast and optimize their go-to-market models to maximize their revenue growth potential.</p>
                    </div>
                    <div>
                        <h5 className='title'> 4. What types of data can be uploaded to the Kinetik Simulation application? </h5>
                        <p>The Kinetik Simulation application accepts data in CSV format. The data should contain columns for opportunity ID, stages, probability, amount, and any additional attributes you want to include in your simulation.</p>
                    </div>
                    <div>
                        <h5 className='title'> 5. How do I upload my data to the Kinetik Simulation application? </h5>
                        <p>After logging into the application, you will be directed to the Control Panel. The Control Panel is where you can upload your data and select the time period for your simulation. To upload your data, click on the “Upload Data” button and select the CSV file you want to upload. Once you have selected your file, click on the “Upload” button to upload your data. You will see a confirmation message once your data has been successfully uploaded.</p>
                    </div>
                    <div>
                        <h5 className='title'> 6. How do I select the time period for my simulation? </h5>
                        <p>After uploading your data, you can select the time period for your simulation by clicking on the drop-down menu in the Control Panel. You can select a time period of one quarter, half a year, or one year.</p>
                    </div>
                    <div>
                        <h5 className='title'> 7. How do I run a simulation? </h5>
                        <p>After uploading your data and selecting the time period for your simulation, you can run a simulation by clicking on the “Run Simulation” button in the Control Panel. Once you have clicked on the “Run Simulation” button, you will see a confirmation message that your simulation is running. Once your simulation is complete, you will see a confirmation message that your simulation is complete and you will be directed to the Simulation Results page.</p>
                    </div>
                    <div>
                        <h5 className='title'> 8. Can I modify my uploaded data after the simulation has started? </h5>
                        <p>No, once the simulation has started, you cannot modify your uploaded data. If you need to make changes to your data, you will need to re-upload a new file and restart the simulation.</p>
                    </div>
                    <div>
                        <h5 className='title'> 9. How long does it take for the simulation to complete? </h5>
                        <p>The time it takes for the simulation to complete depends on the size of your data file and the complexity of your simulation. Generally, smaller files with simpler simulations will complete faster than larger files with more complex simulations.</p>
                    </div>
                    <div>
                        <h5 className='title'> 10. What is a go-to-market profile? </h5>
                        <p>A go-to-market profile is a unique combination of opportunity attributes (e.g. identification channel, seller community, marketing tactic, prospect industry, etc) that has a similar opportunity progression profile. The Kinetik Simulation application develops a unique go-to-market profile through an automated machine learning method that assesses week by week changes of a series of historical pipeline snapshots.</p>
                    </div>
                    <div>
                        <h5 className='title'> 11. Can the Kinetik Simulation application be used for forecasting? </h5>
                        <p>Yes, the Kinetik Simulation application can be used for forecasting. The application produces superior forecasts through cluster analysis of opportunities to identify opportunity attributes with similar opportunity progression profiles.</p>
                    </div>
                    <div>
                        <h5 className='title'> 12. Is it possible to perform scenario analysis with the Kinetik Simulation application? </h5>
                        <p>Yes, the Kinetik Simulation application supports real-time scenario analysis through executive level dashboards and simulation visualizations. Users can create scenarios and visualize the impact of go-to-market model changes on the opportunity pipeline in the application.</p>
                    </div>
                    <div>
                        <h5 className='title'> 13. How do I view the results of my simulation? </h5>
                        <p>After your simulation is complete, you will see the visualization is auto rendering in each stage by week by go-to-market profile in the right hand side.</p>
                    </div>
                    <div>
                        <h5 className='title'> 14. hat level of technical knowledge is required to use the Kinetik Simulation application? </h5>
                        <p>The Kinetik Simulation application is designed to be user-friendly and intuitive. Users do not need a detailed understanding of the underlying data science and velocity statistics to use the application effectively. However, basic knowledge of CSV file format and the ability to follow the guidance is necessary.</p>
                    </div>
                    <div>
                        <h5 className='title'> 15. What is the difference between the Kinetik Simulation application and other forecasting applications? </h5>
                        <p>The Kinetik Simulation application is unique in that it uses a Monte Carlo forecasting model to help large enterprises optimize their go-to-market strategies and improve revenue growth. The application provides users with insight into the constraining factors in their go-to-market models by cross-referencing multiple functions including Sales, Marketing, Sales Operations, Business Partners, and Delivery. The app uses proprietary pipeline velocity metrics, predictive analytics and simulation, and dynamic visualization of the model to create a unique go-to-market profile that is specific to the enterprise. The application supports real-time scenario analysis, executive-level dashboards, and automated machine learning methods to assess week-by-week changes in pipeline snapshots. By leveraging these features, enterprises can accurately forecast and optimize their go-to-market models to maximize their revenue growth potential.</p>
                    </div>
                    <div>
                        <h5 className='title'> 16. How can I get help if I encounter issues with the Kinetik Simulation application? </h5>
                        <p>If you encounter issues with the Kinetik Simulation application, you can refer to the troubleshooting or FAQ sections in the application, or contact the Kinetik Simulation staff for assistance.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq
