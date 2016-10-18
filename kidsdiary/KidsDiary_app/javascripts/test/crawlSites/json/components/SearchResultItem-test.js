import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchResultItem from '../../../../app/crawlSites/json/components/SearchResultItem';

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

describe('crawlSites/json/components/SearchResultItem', () => {
  it('should render correctly', () => {
    const props = {
      dispatch: () => {},
      checkId: 12,
      crawlSiteId: 34,
      crawlSiteIdentifier: 'identi',
      crawlStatusCode: 'SUCCESS',
      siteId: 56,
      siteName: 'foo-site',
      startDate: '2016/01/06 10:21:09',
      duration: '1秒',
      total: 111,
      progress: 222,
      index: 333,
      document: 444
    };
    const { output } = setup(
      <SearchResultItem {...props} />
    );

    expect(output.type).toBe('tr');
    expect(output.props.children.length).toBe(11);
  });
});
