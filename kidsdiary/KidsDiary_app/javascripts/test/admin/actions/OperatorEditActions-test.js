import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  requestData,
  REQUEST_GET_DATA,
  RECEIVE_GET_DATA
} from '../../../app/admin/actions/OperatorEditActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/actions/OperatorEditActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_GET_DATA action when requestData(id) has been done', (done) => {
    nock('http://localhost:80')
      .get('/api/admin/operators/1234')
      .reply(200, 'foo');

    const expectedActions = [
      { type: REQUEST_GET_DATA },
      { type: RECEIVE_GET_DATA, data: 'foo' }
    ];

    const store = mockStore(undefined, expectedActions, done);
    store.dispatch(requestData(1234));
  });
});
