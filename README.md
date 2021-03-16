# CRUK technical exercise (React)

- A design has been provided for you to follow - TO-DO
- The below technical guidance has been provided for the task
- You should use the CRUK component library when building your form https://www.npmjs.com/package/@cruk/cruk-react-components 

## Documentation for tools used
- Formik: https://formik.org/docs/overview 
- Cypress: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html 
- Yup https://github.com/jquense/yup 
- NASA Images and Video Library API https://api.nasa.gov/ 

## Task details
You will be building a form which will fetch assets from the NASA Images and Video Library API. The fields will provide filters for the query. The media returned should be displayed below the form for the user. The user should only see the first 10 items.

## Fields
### Media type field
Required  
Default: none  
Type: Select  
Label: Media type  
Name: mediaType  
Values: [“audio”, “video”, “image”]

An error message below the field should read “Please select a media type.” if the user does not select an option.

### Keywords field
Required  
Initial value: “”  
Type: Text  
Label: Keywords  
Name: keywords  

An error message below the field should read “Please enter keywords to search.” if the user does not fill in the field.

An error message below the field should read “Keywords must be between 2 and 50 characters.” if the field value is less than 2 or more than 50 characters long.

### Year start field
Optional  
Initial value: “”  
Type: Text  
Label: Year start  
Name: yearStart

An error message below the field should read “Please enter a valid year.” if the user enters an invalid year.

An error message below the field should read “Year must not be in the future.” if the user enters a year after the current year.

### Submit button
Submit button should change to a disabled state and label should read “Submitting…” when user clicks the submit button and return to enabled / “Submit” when the API responds.
Form behaviour

## Tests
Ensure your application has adequate test coverage.
