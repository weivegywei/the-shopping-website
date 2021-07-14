import { shallow, mount } from 'enzyme';
import { CartItem } from '../../components/Cart/CartItem';
import { AlertDialog } from '../../components/Utilities/AlertDialog'
import IconButton from '@material-ui/core/IconButton';
import postDataModule from '../../api/postData';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mockCartItem } from '../../constants';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../api/postData.js', () => ({
    postData: () => jest.fn()
}));



describe('CartItem', () => {
    let postData;

    beforeEach(() => {
        postData = jest.spyOn(postDataModule, 'postData');
        postData.mockImplementation(() => jest.fn());
    })

  it('should render correctly', () => {
    const component = shallow(<CartItem item={mockCartItem} />);
    expect(component).not.toBe(null);
  });

  it('should render correctly 2 buttons', () => {
    const component = shallow(<CartItem item={mockCartItem} />);
    expect(component.find(IconButton)).toHaveLength(2);
  });

  it('click delete button should open AlertDialog component', () => {
    const component = shallow(<CartItem item={mockCartItem} />);
    expect(component.find(AlertDialog)).toHaveLength(0);
    component
      .find(IconButton).first()
      .simulate('click');
    expect(component.find(AlertDialog)).toHaveLength(1);
  });

  /* it('click delete should call function to remove item', () => {
    const component = mount(<CartItem item={mockCartItem} />);
    component
      .find(IconButton).first()
      .simulate('click');
    expect(postData).toBeCalled();
    component.unmount();
  }); */
});
