import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import CardShadow from './CardShadow';
import MyTextInput from '../core/MyTextInput';
import MySelect from '../core/MySelect';
import SimpleWhiteCard from '../core/Card/SimpleWhiteCard';
import { useDebouncedValue } from '@/Hook/useDebouncedValue';
import { getCustomerId } from '@/utils/callingapi';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react';

export default function CardResgister({ handleSubmit, customClass }) {
  const [inputValue, setInputValue] = useState('');
  const [customerId, setCustomerId] = useState('');

  const debouncedValue = useDebouncedValue(inputValue, 500);

  useEffect(() => {
    const fetchCustomerId = async () => {
      if (debouncedValue) {
        try {
          const data = { id: debouncedValue };
          const customerId = await getCustomerId(data);
          setCustomerId(customerId);
        } catch (error) {
          // console.error('Failed to fetch customer ID:', error);
          showErrorModal(); // hedi fonction as component
        }
      }
    };

    fetchCustomerId();
  }, [debouncedValue]);
  const showErrorModal = () => {
    // voici le component en question
    return () => (
      <ModalError isOpen={true}>
        <div>c'est un mauvais id </div>
      </ModalError>
    );
  };

  return (
    <div className="flex justify-center items-center" style={{ height: '95%' }}>
      {customerId && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-bold mb-2">Result:</h3>
          <pre>{JSON.stringify(customerId, null, 2)}</pre>
        </div>
      )}
      <Formik
        initialValues={{
          //Business Information
          customerId: '',
          companyName: '',
          companyPhone: '',
          //personelle Information
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          // Business Address
          firstAdresse: '',
          secondAdresse: '',
          thirdAdresse: '',
          city: '',
          prov: '',
          zip: '',

          acceptedTerms: true, // added for our checkbox
          country: '' // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          jobTitle: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),

          email: Yup.string().email('Invalid email address').required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          country: Yup.string()
            .oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }, event) => {
          console.log({ values, setSubmitting });
        }}>
        <Form className="h-full w-full" onSubmit={handleSubmit}>
          <div className={`flex justify-center items-center h-full ${customClass} `}>
            <CardShadow
              customClass={` w-11/12  p-4 h-max shadow-md bg-white bg-opacity-60 flex flex-col lg:flex-row lg:space-x-4 gap-3 `}>
              <div className=" h-full text-white p-4 lg:w-5/12">
                <SimpleWhiteCard title="Business Information">
                  <MyTextInput
                    label="Customer ID"
                    name="id"
                    type="number"
                    placeholder="9348219"
                    autoFocus
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <MyTextInput
                    label="Company Name"
                    name="companyName"
                    type="text"
                    placeholder="Meta"
                  />
                  <MyTextInput
                    label="Company Number"
                    name="companyPhone"
                    type="number"
                    placeholder="1 234 432 235"
                  />
                </SimpleWhiteCard>
                <SimpleWhiteCard title="personelle Information">
                  <MyTextInput label="First Name" name="firstName" type="text" placeholder="Jane" />
                  <MyTextInput label="Last Name" name="lastName" type="text" placeholder="Doe" />
                  <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jane@formik.com"
                  />
                  <MyTextInput label="job Title" name="jobTitle" type="text" placeholder="RH" />
                </SimpleWhiteCard>{' '}
              </div>
              <div className=" h-full  p-4 lg:w-7/12">
                <SimpleWhiteCard title="Business Address">
                  <MyTextInput
                    label="Adresse"
                    name="firstAdresse"
                    type="text"
                    placeholder="Jane123 Rue Maple Ville-de-Québec, QC G1X 3X9"
                  />

                  <MyTextInput
                    label="Adresse 2"
                    name="secondAdresse"
                    type="text"
                    placeholder="optional"
                  />

                  <MyTextInput
                    label="Adresse 3"
                    name="thirdAdresse"
                    type="text"
                    placeholder="optional"
                  />
                  <MyTextInput
                    label="City"
                    name="city"
                    type="text"
                    placeholder="Plateau-Mont-Royal"
                  />
                  <div className="lg:flex lg:flex-row justify-between w-full lg:space-x-6">
                    {' '}
                    <MyTextInput
                      label="Province / State"
                      name="prov"
                      type="text"
                      placeholder="Québec"
                    />
                    <MyTextInput
                      label="Postal / ZIP"
                      name="zip"
                      type="text"
                      placeholder="H2X 1Y6"
                    />
                  </div>
                  <MySelect label="country" name="country">
                    <option value="">Select a country</option>
                    <option value="designer">Designer</option>
                    <option value="development">Developer</option>
                    <option value="product">Product Manager</option>
                    <option value="other">Other</option>
                  </MySelect>
                </SimpleWhiteCard>{' '}
                <div className="h-max flex lg:flex-row flex-col items-center justify-center px-4 py-4 lg:py-8 lg:space-y-0 space-y-4 lg:space-x-8">
                  <h1 className="w-max font-medium text-lg">
                    {' '}
                    Is the information correct? If yes, then{' '}
                  </h1>
                  <button
                    type="submit"
                    className="text-white bg-green-600 py-3 rounded lg:w-1/3 shadow-lg rounded-lg hover:bg-green-700 text-lg w-full">
                    Register now
                  </button>
                </div>
              </div>
            </CardShadow>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
