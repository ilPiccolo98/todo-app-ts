import React, { FormEvent } from "react";
import { Meta, Story } from "@storybook/react";
import { Form, FormProps } from "./Form";
import TextField from "../TextField/TextField";
import Submit from "../Submit/Submit";

const meta: Meta = {
  title: "Form",
  component: Form,
  argTypes: {
    children: {
      defaultValue: <div></div>,
    },
    onSubmit: {
      defaultValue: (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      },
    },
    onClick: {
      action: "Clicked",
    },
    title: {
      defaultValue: "Form component",
    },
  },
};

export default meta;

const Template: Story<FormProps> = (args) => <Form {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <div>
      <div style={{ float: "left" }}>
        <TextField
          id="name"
          name="name"
          type="text"
          variant="secondary"
          labelText="Name"
          placeholder="Insert name"
        />
      </div>
      <div style={{ float: "right" }}>
        <TextField
          id="surname"
          name="surname"
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
  onSubmit: (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
  title: "Primary form",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: (
    <div>
      <div style={{ float: "left" }}>
        <TextField
          id="name"
          name="name"
          type="text"
          variant="primary"
          labelText="Name"
          placeholder="Insert name"
        />
      </div>
      <div style={{ float: "right" }}>
        <TextField
          id="surname"
          name="surname"
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
  onSubmit: (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
  title: "Secondary form",
  variant: "secondary",
};
