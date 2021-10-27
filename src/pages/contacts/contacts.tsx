import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserLayout from '../../components/layout/user';
import ReactSelect from '../../components/select/reactSelect';

import ContactItem from './components/contact';
import MainInput from '../../components/input/mainInput';

import { fetchCurrentUser } from '../../store/app/actions';
import { uploadUserImageRequest } from '../../store/user/actions';
import {
  createContactRequest,
  fetchContactsByPayloadFailure,
  fetchContactsByPayloadRequest,
} from '../../store/contact/actions';

const options1 = [{ label: 'option1', value: 'option1' }];
const options2 = [{ label: 'option2', value: 'option2' }];
const options3 = [{ label: 'option3', value: 'option3' }];

export default function Contacts() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.app.currentUser);
  const contacts = useSelector((state: any) => state.contact);
  const resImage = useSelector((state: any) => state.user.userImage);

  useEffect(() => {
    async function fetchData() {
      const result: any = await dispatch(fetchCurrentUser());

      if (result.payload) {
        await dispatch(
          fetchContactsByPayloadRequest({
            userId: result.payload.id,
          }),
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (resImage !== '') {
      setContactState({ ...contactState, avatar: resImage });
    }
  }, [resImage]);

  useEffect(() => {
    async function fetchData() {
      if (contacts.data?.success) {
        await dispatch(
          fetchContactsByPayloadRequest({
            userId: currentUser.id,
          }),
        );
        await dispatch(fetchContactsByPayloadFailure(null));
      }
    }

    fetchData();
  }, [contacts.data]);

  const [isLoading, setIsLoading] = useState(true);
  const [contactState, setContactState] = useState({
    avatar: '//ssl.gstatic.com/accounts/ui/avatar_2x.png',
    username: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [option1, setOption1] = useState(options1[0]);
  const [option2, setOption2] = useState(options2[0]);
  const [option3, setOption3] = useState(options3[0]);

  // const handleClickContact = (item: any) => () => {
  //   setContactState(item);
  // };

  const handleInputChange = (e: any) => {
    setContactState({ ...contactState, [e.target.name]: e.target.value });
  };

  const handleUploadImage = async (e: any) => {
    try {
      const imagePure = e.target.files[0];
      const src = URL.createObjectURL(imagePure);

      const formData = new FormData();
      formData.append('photo', imagePure, imagePure.name);

      setContactState({ ...contactState, avatar: src });

      await dispatch(uploadUserImageRequest(formData));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      username: contactState.username,
      email: contactState.email,
      avatar: contactState.avatar,
      userId: currentUser.id,
    };
    await dispatch(createContactRequest(payload));
    setSubmitting(false);
  };

  return (
    <UserLayout>
      {isLoading ? (
        <Fragment></Fragment>
      ) : (
        <div className="contacts-page">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="contacts-options-wrapper rounded-3 d-flex flex-column justify-content-center">
                <div className="option-wrapper form-group mb-4">
                  <label htmlFor="main-select">Option 1</label>
                  <ReactSelect
                    options={options1}
                    value={option1}
                    onChange={(e: any) => setOption1(e.target.value)}
                  />
                </div>
                <div className="option-wrapper form-group mb-4">
                  <label htmlFor="main-select">Option 2</label>
                  <ReactSelect
                    options={options2}
                    value={option2}
                    onChange={(e: any) => setOption2(e.target.value)}
                  />
                </div>
                <div className="option-wrapper form-group mb-4">
                  <label htmlFor="main-select">Option 3</label>
                  <ReactSelect
                    options={options3}
                    value={option3}
                    onChange={(e: any) => setOption3(e.target.value)}
                  />
                </div>
                <div className="option-wrapper form-group mb-4">
                  <label htmlFor="main-select">Option 4</label>
                  <ReactSelect
                    options={options3}
                    value={option3}
                    onChange={(e: any) => setOption3(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary btn-lg w-100 mt-5">
                  <span className="text-light fs-6 ps-2">Done</span>
                </button>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="contracts-wrapper rounded-3">
                {contacts.contactList?.map((item: any) => (
                  <Fragment key={item.id}>
                    {item.id !== currentUser.id && <ContactItem item={item} />}
                  </Fragment>
                ))}
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row align-items-start">
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <label htmlFor="contact-form-avatar-input">
                        <img src={contactState?.avatar} className="contact-form-avatar" alt="" />
                      </label>
                      <input
                        type="file"
                        id="contact-form-avatar-input"
                        accept="image/*"
                        onChange={handleUploadImage}
                        hidden
                      />
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                      <div className="contact-form-inputs">
                        <MainInput
                          id="username"
                          type="text"
                          placeholder="Username"
                          icon="user"
                          name="username"
                          value={contactState.username}
                          onChange={handleInputChange}
                          required
                        />
                        <MainInput
                          id="email-address"
                          type="email"
                          placeholder="Email address"
                          icon="envelope"
                          name="email"
                          value={contactState.email}
                          onChange={handleInputChange}
                          required
                        />
                        <button className="btn btn-primary btn-lg w-50">
                          <span className="text-light fs-6 ps-2">Submit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
