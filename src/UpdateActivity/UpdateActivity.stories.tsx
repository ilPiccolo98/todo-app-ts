import React from "react";
import { Meta, Story } from "@storybook/react";
import { UpdateActivity, UpdateActivityProps } from "./UpdateActivity";
import store from "../activities/activitiesStore";
import { Provider } from "react-redux";

const meta: Meta = {
  title: "UpdateActivity",
  component: UpdateActivity,
  argTypes: {},
};

export default meta;
const Template: Story<UpdateActivityProps> = (args) => (
  <Provider store={store}>
    <UpdateActivity {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {};
