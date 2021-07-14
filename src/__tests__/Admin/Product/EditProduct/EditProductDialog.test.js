import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { EditProductDialog } from '../../../../components/Admin/Product/EditProduct/EditProductDialog';
import Button from '@material-ui/core/Button';
import { mockProductItem } from '../../../../constants';

Enzyme.configure({ adapter: new Adapter() });
const mockPostData = jest.fn();

jest.mock('../../../../api/postData.js', () => ({
    postData: () => mockPostData()
}));

const cancelFn = jest.fn();
describe('EditProductDialog', () => {

    beforeEach(() => {

    })

    it('should render correctly', () => {
        const component = shallow(<EditProductDialog open={true} item={mockProductItem} handleClose={cancelFn} />);
        expect(component).not.toBe(null);
    });
    
    it('should render correctly 2 buttons', () => {
        const component = shallow(<EditProductDialog open={true} item={mockProductItem} handleClose={cancelFn} />);
        expect(component.find(Button)).toHaveLength(2);
    });

    it('click cancel button should call function', () => {
        const component = mount(<EditProductDialog open={true} item={mockProductItem} handleClose={cancelFn} />);
        component
            .find(Button).first()
            .simulate('click');
        expect(cancelFn).toBeCalled();
        component.unmount();
    });

    it('click save button should call function', () => {
        const n = mockPostData.mock.calls.length;
        const component = mount(<EditProductDialog open={true} item={mockProductItem} handleClose={cancelFn} />);
        component
            .find(Button).at(1)
            .simulate('click');
        expect(mockPostData).toHaveBeenCalledTimes(n + 1);
        component.unmount();
    });

});
