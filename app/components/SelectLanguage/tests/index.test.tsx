import {mount, shallow, ShallowWrapper} from 'enzyme';
import React, { useContext } from 'react';

import { LanguageContext, LanguageProvider } from 'providers/LanguageProvider';
import { createSnapshotWithIntl } from 'testing/utils';

import SelectLanguage from '..';

const FakeConsumer: React.FC = (): React.ReactElement => {
  const context = useContext(LanguageContext);

  return (
    <div id="current-language">
      {context?.language}
    </div>
  );
};

describe('<SelectLanguage />', (): void => {
  it('should change global state when a new value is selected', (): void => {
    const component = mount(
      <LanguageProvider locale="en">
        <div>
          <SelectLanguage />
          <FakeConsumer />
        </div>
      </LanguageProvider>
    );

    const select = component.find('select');

    select.simulate('change', {target: { value: 'es'}});

    const consumer = component.find('div#current-language').at(0);

    expect(consumer.text()).toEqual('es');
  });

  it('should render correctly when wrapped in LanguageProvider', (): void => {
    const tree = createSnapshotWithIntl(<SelectLanguage />, 'en');

    expect(tree).toMatchSnapshot();
  });

  it('should throw an error when not wrapped in LanguageProvider', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> => shallow(<SelectLanguage />)).toThrowError();
  });
});
