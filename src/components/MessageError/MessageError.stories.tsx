import React from "react";
import { Meta, Story } from "@storybook/react";
import MessageError, { MessageErrorProps } from "./MessageError";

const meta: Meta = {
  title: "MessageError",
  component: MessageError,
};

export default meta;

const Template: Story<MessageErrorProps> = (args) => <MessageError {...args} />;
export const Small = Template.bind({});
Small.args = {
  children: "Error example",
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  children: "Error example",
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  children: "Error example",
  size: "large",
};
