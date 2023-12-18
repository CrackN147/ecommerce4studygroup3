import { useState, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import editIcon from 'theme/images/edit.svg';
import closeIcon from 'theme/images/close.svg';
import { updateUserInfo } from "global/api/endpoints";
import { StaticDataContext } from "global/contexts/StaticDataContext";
import { UserDataContext } from "global/contexts/UserDataContext";

import { Sidebar } from "components"

export const ProfilePage = () => {
  const { langs } = useContext(StaticDataContext);
  const { userInfo, fetchUserData } = useContext(UserDataContext);
  const validationSchema = Yup.object({
    name: Yup.string().required(langs.loginForm.required),
    lastname: Yup.string().required(langs.loginForm.required),
    email: Yup.string().required(langs.loginForm.required),
    phone: Yup.string().required(langs.loginForm.required),
    city: Yup.string().required(langs.loginForm.required),
    number: Yup.string().required(langs.loginForm.required),
    street: Yup.string().required(langs.loginForm.required),
    zipcode: Yup.string().required(langs.loginForm.required)
  })
  const [editForm, setEditForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    number: "",
    street: "",
    zipcode: ""
  });
  const toggleEditForm = () => {
    setEditForm(!editForm);
  }

  const onSubmit = async (values) => {
    let finalData = {
      email: values.email,
      name: {
        firstname: values.name,
        lastname: values.lastname
      },
      address: {
        city: values.city,
        street: values.street,
        number: values.number,
        zipcode: values.zipcode
      },
      phone: values.phone
    }
    const update = await updateUserInfo(finalData);
    if (update) {
      toggleEditForm();
      fetchUserData();
    }
  }

  useEffect(() => {
    if (userInfo) {
      setInitialValues({
        name: userInfo.name.firstname,
        lastname: userInfo.name.lastname,
        email: userInfo.email,
        phone: userInfo.phone,
        city: userInfo.address.city,
        number: userInfo.address.number,
        street: userInfo.address.street,
        zipcode: userInfo.address.zipcode
      })
    }
  }, [userInfo])

  return (
    <div className='row d-flex mx-2 my-4'>
      <Sidebar />
      <div className='col col-9 in-user-page'>
        <div className="profile-head">
          <h1>{langs.profilePage.title}</h1>
          <div className="edit-icon"
            onClick={toggleEditForm}
          >
            <img src={editForm ? closeIcon : editIcon} alt="edit" />
          </div>
        </div>
        {userInfo ?
          <div className="user-box">
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <div>
                    <h2>{langs.profilePage.name}</h2>
                    {editForm ?
                      <Field
                        name="name"
                        type="text"
                        placeholder={langs.profilePage.name}
                      />
                      : <p>{userInfo.name.firstname}</p>
                    }
                  </div>
                  <div>
                    <h2>{langs.profilePage.lastname}</h2>
                    {editForm ?
                      <Field
                        name="lastname"
                        type="text"
                        placeholder={langs.profilePage.lastname}
                      />
                      : <p>{userInfo.name.lastname}</p>
                    }
                  </div>
                  <div>
                    <h2>{langs.profilePage.email}</h2>
                    {editForm ?
                      <Field
                        name="email"
                        type="email"
                        placeholder={userInfo.email}
                      />
                      : <p>{userInfo.email}</p>
                    }
                  </div>
                  <div>
                    <h2>{langs.profilePage.phone}</h2>
                    {editForm ?
                      <Field
                        name="phone"
                        type="text"
                        placeholder={userInfo.phone}
                      />
                      : <p>{userInfo.phone}</p>
                    }
                  </div>
                  <div className="w-100">
                    <h2>{langs.profilePage.address}</h2>
                    {editForm ?
                      <div className="w-100 address-form-container">
                        <div>
                          <h3>{langs.profilePage.city}</h3>
                          <Field
                            name="city"
                            type="text"
                            placeholder={langs.profilePage.city}
                          />
                        </div>
                        <div>
                          <h3>{langs.profilePage.number}</h3>
                          <Field
                            name="number"
                            type="text"
                            placeholder={langs.profilePage.number}
                          />
                        </div>
                        <div>
                          <h3>{langs.profilePage.street}</h3>
                          <Field
                            name="street"
                            type="text"
                            placeholder={langs.profilePage.street}
                          />
                        </div>
                        <div>
                          <h3>{langs.profilePage.zip}</h3>
                          <Field
                            name="zipcode"
                            type="text"
                            placeholder={langs.profilePage.zip}
                          />
                        </div>
                      </div>
                      : <p>{userInfo.address.city} {userInfo.address.number} {userInfo.address.street} {userInfo.address.zipcode}</p>
                    }
                  </div>
                  {editForm ?
                    <button type="submit">
                      {langs.profilePage.save}
                    </button>
                    : null}
                </Form>
              )}
            </Formik>
          </div>
          : null}
      </div>
    </div>
  )
}