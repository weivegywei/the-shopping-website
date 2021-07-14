import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { AfterPaymentPage } from '../../components/Cart/AfterPaymentPage';

Enzyme.configure({ adapter: new Adapter() });

describe('AfterPaymentPage', () => {
    it('should render correctly', () => {
        const component = shallow(<AfterPaymentPage />);
        expect(component).not.toBe(null);
    });
})
