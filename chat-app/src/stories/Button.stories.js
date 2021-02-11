import React from 'react';
import { Button } from '../components/Button';


export default {
    title: 'Button',
    description: 'Hola button',
    component: Button,
    argTypes: {
        backgroundColor: {
            control: 'color'
        }
    }
};

const Template = (args) => <Button {...args} />;

export const Example = Template.bind({});
Example.args = {
    text: 'Login',
    loading: true
};
