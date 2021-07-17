import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CartPage } from '../../components/Cart/CartPage';
import { mockUserStore } from '../../constants';
import { mockCartItem } from '../../constants';
import Button from '@material-ui/core/Button';
import { PayPalBox } from '../../components/Cart/PayPalBox';


Enzyme.configure({ adapter: new Adapter() });
const mockAxios = require("axios")

describe('CartPage', () => {
    it('should render correctly', () => {
        const component = shallow(<CartPage userStore={mockUserStore} />);
        expect(component).not.toBe(null);
    });

    it('after clicking button PayPalBox component should be opened', () => {
        const component = mount(<CartPage userStore={mockUserStore} />);
        expect(component.find(PayPalBox)).toHaveLength(0);
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: [
                mockCartItem
            ] })
        );
        component.find(Button).simulate('click');
        expect(component.find(PayPalBox)).toHaveLength(1);
    })
});
//await flushPromises();
//export const flushPromises = () => new Promise( resolve => setImmediate(resolve));
