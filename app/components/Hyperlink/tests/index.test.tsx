import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { createSnapshot } from 'testing/utils';

import Hyperlink from '..';
import { BrowserTarget } from '../types';

const testHyperlink = (href: string, text: string, target?: BrowserTarget): void => {
  const tree = createSnapshot(
    <Router>
      <Hyperlink href={href} target={target}>{text}</Hyperlink>
    </Router>
  );

  expect(tree).toMatchSnapshot();
};

const testExternalHyperlink = (target?: BrowserTarget): void => testHyperlink('https://www.google.com', 'External Link Text', target);

const testLocalHyperlink = (target?: BrowserTarget): void => testHyperlink('/', 'Local Link Text', target);

describe('<Hyperlink />', (): void => {
  it('should render external link when href is for a different host', (): void => testExternalHyperlink());

  it('should render internal link when href is for the current host', (): void => testLocalHyperlink());

  describe('target', (): void => {
    it('should be set to _blank when a target is not provided and href is for a different host', (): void => testExternalHyperlink());

    it('should be set to _self when a target is not provided and href is for the current host', (): void => testLocalHyperlink());

    it('should be set to the given target when a target is provided and href is for a different host', (): void => testExternalHyperlink('_top'));

    it('should be set to the given target when a target is provided and href is for the current host', (): void => testLocalHyperlink('_top'));
  });
});
