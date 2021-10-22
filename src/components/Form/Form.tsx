import React, { HTMLAttributes } from "react";
import { Formik, FormikProps, Form as FormFormik } from "formik";
import "./Form.css";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  /**Values to insert into the Form */
  initialValues: Object;
  /**Values to check using yup*/
  validationSchema?: Object;
  /**JSX element child to show inside the Form */
  children?: JSX.Element;
  /**Handling the Submit event */
  handleSubmit: (values: any) => void;
  /**Header of the Form */
  title?: string;
  /**How to handle any errors */
  handleError: (
    values: FormikProps<any>
  ) => JSX.Element[] | JSX.Element | string;
  /**Which style it should use */
  variant: "primary" | "secondary";
}

/**Generic Form of the todo-app  */
export const Form: React.FC<FormProps> = ({
  initialValues,
  children,
  handleSubmit,
  title,
  handleError,
  variant,
  ...props
}): JSX.Element => {
  return (
    <div className={`form ${variant}-form ${props.className}`}>
      <p>
        <b>{title}</b>
      </p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(values) => (
          <FormFormik>
            {children}
            <p className="error">
              <b>{handleError(values)}</b>
            </p>
          </FormFormik>
        )}
      </Formik>
    </div>
  );
};

export default Form;
