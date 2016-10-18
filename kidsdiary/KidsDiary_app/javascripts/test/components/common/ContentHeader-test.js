import * as Mocha from 'mocha';

import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ContentHeader from '../../../app/components/common/ContentHeader';
import { setDom } from '../../test-helper';

function setup(component) {
  const props = {
    // someHandler: expect.createSpy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

Mocha.describe('components/common/ContentHeader', () => {
  Mocha.beforeEach(() => {
    setDom();
  });

  Mocha.it('should render correctly', () => {
    const props = {
      headerTitle: 'foo',
      description: 'bar'
    };
    const { output } = setup(
      <ContentHeader {...props} />
    );

    expect(output.type).toBe('section');
    expect(output.props.className).toBe('content-header');

    const [h1, ...rest] = output.props.children;

    expect(h1.type).toBe('h1');

    const children = h1.props.children;
    expect(children[0]).toBe('foo');
    expect(children[1].props.children).toBe('bar');
  });
});
