import styled, { ThemeProvider } from "styled-components";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button, TextField, crukTheme } from "@cruk/cruk-react-components";

const SiteWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

function App() {
  const formSchema = yup.object().shape({
    town: yup.string()
      .required("Please enter keywords to search.")
  });

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
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              console.log(values);
            }}>
            {({ errors, touched }) => {
              return (
                <Form>
                  <Field name="keywords">
                    {({ field }) => (
                      <>
                        <TextField
                          label="Keywords" 
                          type="text"
                          required
                          {...field}
                        />
                        {errors.keywords && touched.keywords && <p>{errors.keywords}</p>}
                      </>
                    )}
                  </Field>

                  <Button type="submit">Submit</Button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </SiteWrapper>
    </ThemeProvider>
  );
}

export default App;
