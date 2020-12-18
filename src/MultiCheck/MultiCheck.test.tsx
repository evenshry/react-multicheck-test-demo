import React, { useState } from 'react';
import Renderer, { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';
import Enzyme from 'enzyme';
import MultiCheck, { Option } from './MultiCheck';

const options = [
  { label: 'aaa', value: '111' },
  { label: 'bbb', value: '222' },
  { label: 'ccc', value: '333' },
  { label: 'ddd', value: '444' },
  { label: 'eee', value: '555' },
  { label: 'fff', value: '666' },
  { label: 'ggg', value: '777' },
  { label: 'hhh', value: '888' },
  { label: 'iii', value: '999' },
];

describe('MultiCheck', () => {
  describe('initialize', () => {
    it('renders the label if label not provided', () => {
      const component: ReactTestRenderer = Renderer.create(<MultiCheck options={[]} />);
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findByProps({ className: 'MultiCheck_Title' }).children).toEqual(['MultiCheck']);
    });

    it('renders the label if label provided', () => {
      const component: ReactTestRenderer = Renderer.create(<MultiCheck label="my-multi-check" options={[]} />);
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findByProps({ className: 'MultiCheck_Title' }).children).toEqual(['my-multi-check']);
    });

    it('renders the options if options length is 0', () => {
      const component: ReactTestRenderer = Renderer.create(<MultiCheck options={[]} />);
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ className: 'MultiCheck_Column_Item' }).length).toEqual(0);
    });

    it('renders the options if options length is 9', () => {
      const component: ReactTestRenderer = Renderer.create(<MultiCheck options={options} />);
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ className: 'MultiCheck_Column_Item' }).length).toEqual(9 + 1);
    });

    it('renders the columns if columns is 1', () => {
      const component: ReactTestRenderer = Renderer.create(<MultiCheck options={options} columns={1} />);
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ className: 'MultiCheck_Column' }).length).toEqual(1);
    });

    it('renders the columns if columns is 2', () => {
      const component: ReactTestRenderer = Renderer.create(<MultiCheck options={options} columns={2} />);
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ className: 'MultiCheck_Column' }).length).toEqual(2);
    });

    it('renders the values if values is ["333", "555"]', () => {
      const component: ReactTestRenderer = Renderer.create(<MultiCheck options={options} values={['333', '555']} columns={2} />);
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ checked: true }).length).toEqual(2);
    });

    it('renders the values if values is ["111", "222", "333", "444", "555", "666", "777", "888", "999"]', () => {
      const component: ReactTestRenderer = Renderer.create(
        <MultiCheck options={options} values={['111', '222', '333', '444', '555', '666', '777', '888', '999']} columns={2} />
      );
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ checked: true }).length).toEqual(10);
    });
  });

  describe('update', () => {
    let component: ReactTestRenderer = Renderer.create(<MultiCheck options={[]} />);

    it('update the label if label provided', () => {
      Renderer.act(() => {
        component.update(<MultiCheck label="my-multi-check" options={[]} />);
      });
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findByProps({ className: 'MultiCheck_Title' }).children).toEqual(['my-multi-check']);
    });

    it('update the options if options length is 9', () => {
      Renderer.act(() => {
        component.update(<MultiCheck label="my-multi-check" options={options} />);
      });
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ className: 'MultiCheck_Column_Item' }).length).toEqual(9 + 1);
    });

    it('update the columns if columns is 2', () => {
      Renderer.act(() => {
        component.update(<MultiCheck options={options} columns={2} />);
      });
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ className: 'MultiCheck_Column' }).length).toEqual(2);
    });

    it('update the values if values is ["333", "555"]', () => {
      Renderer.act(() => {
        component.update(<MultiCheck options={options} values={['333', '555']} columns={2} />);
      });
      const testInstance: ReactTestInstance = component.root;
      expect(testInstance.findAllByProps({ checked: true }).length).toEqual(2);
    });
  });

  describe('event', () => {
    let defaultValues: string[] = ['333', '555'];

    function onSelectedOptionsChange(options: Option[]): void {
      defaultValues = options.map((it) => it.value);
    }

    const component: Enzyme.ShallowWrapper = Enzyme.shallow(
      <MultiCheck options={options} values={defaultValues} columns={2} onChange={onSelectedOptionsChange} />
    );

    it('change a unchecked checkbox to checked', () => {
      // init initialize parameters
      defaultValues = ['333', '555'];
      component.setProps({ values: defaultValues });
      const checkBoxs = component.find('.MultiCheck_Column_Check');
      // simulate change event
      checkBoxs.at(1).simulate('change');
      expect(defaultValues.length).toEqual(3);
      component.setProps({ values: defaultValues });
      expect(component.find({ checked: true }).length).toEqual(3);
    });

    it('change a checked checkbox to unchecked', () => {
      // init initialize parameters
      defaultValues = ['333', '555'];
      component.setProps({ values: defaultValues });
      const checkBoxs = component.find('.MultiCheck_Column_Check');
      // simulate change event
      checkBoxs.at(3).simulate('change');
      expect(defaultValues.length).toEqual(1);
      component.setProps({ values: defaultValues });
      expect(component.find({ checked: true }).length).toEqual(1);
    });

    it('change the "Select All" checkbox to checked', () => {
      // init initialize parameters
      defaultValues = ['333', '555'];
      component.setProps({ values: defaultValues });
      const checkBoxs = component.find('.MultiCheck_Column_Check');
      // simulate change event
      checkBoxs.at(0).simulate('change');
      expect(defaultValues.length).toEqual(9);
      component.setProps({ values: defaultValues });
      expect(component.find({ checked: true }).length).toEqual(10);
    });

    it('change the "Select All" checkbox to unchecked', () => {
      // init initialize parameters
      defaultValues = ['111', '222', '333', '444', '555', '666', '777', '888', '999'];
      component.setProps({ values: defaultValues });
      const checkBoxs = component.find('.MultiCheck_Column_Check');
      // simulate change event
      checkBoxs.at(0).simulate('change');
      expect(defaultValues.length).toEqual(0);
      component.setProps({ values: defaultValues });
      expect(component.find({ checked: true }).length).toEqual(0);
    });
  });
});
