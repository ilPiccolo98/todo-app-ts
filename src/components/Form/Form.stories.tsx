import React from "react";
import { Meta, Story } from "@storybook/react";
import { Form, FormProps } from "./Form";
import TextField from "../TextField/TextField";
import Submit from "../Submit/Submit";

const meta: Meta = {
  title: "Form",
  component: Form,
  argTypes: {
    initialValues: {
      defaultValue: {},
    },
    children: {
      defaultValue: <div></div>,
    },
    handleSubmit: {
      defaultValue: (values: Object) => {},
    },
    title: {
      defaultValue: "Form component",
    },
    handleError: {
      defaultValue: (values: Object) => <p>Error</p>,
    },
  },
};

export default meta;

const Template: Story<FormProps> = (args) => <Form {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  initialValues: {},
  children: (
    <div>
      <div style={{ float: "left" }}>
        <TextField
          type="text"
          variant="secondary"
          labelText="Name"
          placeholder="Insert name"
        />
      </div>
      <div style={{ float: "right" }}>
        <TextField
          type="text"
          variant="secondary"
          labelText="Surname"
          placeholder="Insert surname"
          style={{ float: "right" }}
        />
      </div>
      <Submit
        style={{ marginTop: "10px" }}
        variant="primary"
        children="Submit"
      />
    </div>
  ),
  handleSubmit: (values: Object) => {},
  title: "Primary form",
  handleError: (values: Object) => <p>Error</p>,
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  initialValues: {},
  children: (
    <div>
      <div style={{ float: "left" }}>
        <TextField
          type="text"
          variant="primary"
          labelText="Name"
          placeholder="Insert name"
        />
      </div>
      <div style={{ float: "right" }}>
        <TextField
          type="text"
          variant="primary"
          labelText="Surname"
          placeholder="Insert surname"
          style={{ float: "right" }}
        />
      </div>
      <Submit
        style={{ marginTop: "10px" }}
        variant="tertiary"
        children="Submit"
      />
    </div>
  ),
  handleSubmit: (values: Object) => {},
  title: "Secondary form",
  handleError: (values: Object) => <p>Error</p>,
  variant: "secondary",
};
