import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
// react-addons-test-utils is utilized by Enzyme, but didn't actually need
// to be explicitlly imported here.
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  const props = {
    course: {}, saving: saving, errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm { ...props } />);
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    // Expect to find 1 and only 1 form
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    // The Save button is the only "input". Others are considered
    // TextInput and SelectInput, as confirmed by a test that follows.
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    // The Save button is the only "input". Others are considered
    // TextInput and SelectInput as confirmed by a test by follows.
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });

  it('has 3 TextInput and 1 SelectInput', () => {
    const wrapper = setup(true);
    // Test to confirm that finding goes by React component name.
    expect(wrapper.find('TextInput').length).toBe(3);
    expect(wrapper.find('SelectInput').length).toBe(1);
  });
});
