import React from "react";
import { Meta, Story } from "@storybook/react";
import { DeleteActivity, DeleteActivityProps } from "./DeleteActivity";
import store from "../activities/activitiesStore";
import { Provider } from "react-redux";

const meta: Meta = {
  title: "DeleteActivity",
  component: DeleteActivity,
  argTypes: {},
};

export default meta;
const Template: Story<DeleteActivityProps> = (args) => (
  <Provider store={store}>
    <DeleteActivity {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {};
