import { useContext } from "react";
import { StaticDataContext } from "global/contexts/StaticDataContext";
import { UserDataContext } from "global/contexts/UserDataContext";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
import {userLogin} from 'global/api/endpoints';
import { storeUser } from "global/api/auth";
export const LoginForm = ({toggle}) => {
  const { langs } = useContext(StaticDataContext);
  const { loginUser } = useContext(UserDataContext);
  const onSubmit = async (values) => {
    const getTokenData = await userLogin(values);
    if (getTokenData) {
      storeUser(getTokenData);
      loginUser();
      toggle();
    }
  }

  let config = {
    initialValues: {
      username: "mor_2314",
      password: "83r5^_"
    },
    validationSchema: Yup.object({
      username: Yup.string().required(langs.loginForm.required),
      password: Yup.string().required(langs.loginForm.required)
    }),
    onSubmit: onSubmit
  }

  return (
    <div className='login-form'>
      <h2 className="text-center">
        {langs.loginForm.title}
      </h2>
      <Formik {...config}>
        {({ isSubmitting, errors }) => (
          <Form>
            <div className='row'>
              <div className='col col-12'>
                <Field 
                  type="username" 
                  name="username" 
                  placeholder={langs.loginForm.username}
                  className={`${errors.username ? 'error' : ''}`}
                />
                <ErrorMessage name="username" component="label" />
              </div>
              <div className='col col-12'>
                <Field 
                  type="password" 
                  name="password" 
                  placeholder={langs.loginForm.password}
                  className={`${errors.password ? 'error' : ''}`}
                />
                <ErrorMessage name="password" component="label" />
              </div>
              <div className='col col-12'>
                <button type="submit" disabled={isSubmitting || errors.length > 0}>
                  {langs.loginForm.login}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}