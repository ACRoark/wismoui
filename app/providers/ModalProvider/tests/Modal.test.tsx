/**
 *
 * Tests for Modal
 *
 */
import { render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { TestRendererJsonType } from 'testing/types';

import Modal from '../Modal';

// tslint:disable-next-line: typedef
jest.mock('react-dom', () => ({
  // tslint:disable-next-line: typedef
  createPortal: node => node,
}));

const Content = (): React.ReactElement => (<div>Hello, WISMO!</div>);
const Footer = (): React.ReactElement => (<button type="button">Close</button>);
const Title = (): React.ReactElement => (<div>My Modal</div>);

describe('<Modal />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<Modal
      config={{
        content: Content,
        footer: Footer,
        title: Title,
      }} />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render correctly when content and footer are provided', (): void => {
    const tree: TestRendererJsonType = renderer.create(
      <Modal
        config={{
          content: Content,
          footer: Footer,
        }} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when content and title are provided', (): void => {
    const tree: TestRendererJsonType = renderer.create(
      <Modal
        config={{
          content: Content,
          title: Title,
        }} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when content, footer and title are provided', (): void => {
    const tree: TestRendererJsonType = renderer.create(
      <Modal
        config={{
          content: Content,
          footer: Footer,
          title: Title,
        }} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when only content is provided', (): void => {
    const tree: TestRendererJsonType = renderer.create(
      <Modal
        config={{
          content: Content,
        }} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
