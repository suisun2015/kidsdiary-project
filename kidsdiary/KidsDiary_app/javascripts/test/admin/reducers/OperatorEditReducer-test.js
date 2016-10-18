import expect from 'expect';
import adminOperatorEdit from '../../../app/admin/reducers/OperatorEditReducer';

describe('admin/reducers/OperatorEditReducer', () => {
  it('reduce empty action', () => {
    expect(
      adminOperatorEdit(undefined, {})
    ).toEqual({
      loading: false,
      totalHits: 0,
      result: {},
      roles: [],
      form: {
        roleIds: []
      }
    });
  });
});
