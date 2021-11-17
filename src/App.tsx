import styled, { ThemeProvider } from "styled-components";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import {
  Button,
  TextField,
  crukTheme,
  Select,
} from "@cruk/cruk-react-components";
import React from "react";
import apiService from "./apiService";
import { IFormValues } from "./interfaces";

const SiteWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

function App() {
  const formSchema = yup.object().shape({
    keywords: yup
      .string()
      .min(2, "Keywords must be between 2 and 50 characters")
      .max(50, "Keywords must be between 2 and 50 characters")
      .required("Please enter keywords to search"),
    mediaType: yup.string().required("Please select a media type"),
    yearStart: yup
      .number()
      .typeError("Please enter a valid year")
      .min(1969, "Please enter a valid year")
      .max(2021, "Year must not be in the future")
      .required("Please enter a valid year"),
  });

  const apiCall = async (values: IFormValues) => {
    const res = await apiService.getData(values);
    // console.log(res.collection.items);
    const dataToShow = res.collection.items.slice(0, 10);
    console.log(dataToShow);
  };

  return (
    <ThemeProvider theme={crukTheme}>
      <SiteWrapper>
        <div>
          <h1>CRUK technical exercise - React</h1>
        </div>
        <div>
          <Formik
            validateOnChange
            initialValues={{
              keywords: "",
              mediaType: "",
              yearStart: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values: IFormValues, actions) => {
              console.log(values);
              apiCall(values);
              actions.resetForm();
            }}
          >
            {({ errors, touched, handleBlur }) => {
              return (
                <Form>
                  <Field name="keywords">
                    {({ field }: { field: any }) => (
                      <>
                        <TextField
                          label="Keywords"
                          type="text"
                          required
                          {...field}
                          onBlur={handleBlur("keywords")}
                          placeholder="Please enter some keywords to search"
                        />
                        {errors.keywords && touched.keywords && (
                          <p>{errors.keywords}</p>
                        )}
                      </>
                    )}
                  </Field>
                  {
                    <Field name="mediaType">
                      {({ field }: { field: any }) => (
                        <>
                          <Select
                            label="Media type"
                            required
                            {...field}
                            data-testid="select"
                          >
                            <option
                              value=""
                              label="Please select a media type"
                            />
                            <option value="audio" label="Audio" />
                            <option value="video" label="Video" />
                            <option value="image" label="Image" />
                          </Select>
                          {errors.mediaType && touched.mediaType && (
                            <p>{errors.mediaType}</p>
                          )}
                        </>
                      )}
                    </Field>
                  }
                  <Field name="yearStart">
                    {({ field }: { field: any }) => (
                      <>
                        <TextField
                          label="Year start"
                          type="text"
                          required
                          {...field}
                          placeholder="Please enter a year to search"
                        />
                        {errors.yearStart && touched.yearStart && (
                          <p>{errors.yearStart}</p>
                        )}
                      </>
                    )}
                  </Field>

                  <Button type="submit">Submit</Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </SiteWrapper>
    </ThemeProvider>
  );
}

export default App;
