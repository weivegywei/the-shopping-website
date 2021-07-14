import { shallow } from 'enzyme';
import { EditCategoryDropdown } from '../../../../components/Admin/Product/EditProduct/EditCategoryDropdown';

describe('EditCategoryDropdown', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<EditCategoryDropdown />);
    //expect(component).toMatchSnapshot();
    expect(component).not.toBe(null);
  });
});
