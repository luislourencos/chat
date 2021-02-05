import React from 'react';
import { Spinner } from '../components/Spinner';


export default {
    title: 'Spinner',
    description: 'Hola Spinner',
    component: Spinner,
    argTypes: {
        color: {
            control: 'color'
        }
    }
};

const Template = (args) => <Spinner {...args} />;

export const Example = Template.bind({});
Example.args = {

};
