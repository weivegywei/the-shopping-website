import { shallow, mount } from 'enzyme';
import { DeleteButton } from '../../../components/Admin/Product/DeleteButton';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import IconButton from '@material-ui/core/IconButton';

Enzyme.configure({ adapter: new Adapter() });
const clickFn = jest.fn();

describe('DeleteButton', () => {
    it('should render correctly', () => {
        const component = shallow(<DeleteButton onClick={clickFn} />);
        expect(component).not.toBe(null);
    });

    it('should render correctly 1 button', () => {
        const component = shallow(<DeleteButton onClick={clickFn} />);
        expect(component.find(IconButton)).toHaveLength(1);
    });

    it('click button should call function', () => {
        const component = mount(<DeleteButton onClick={clickFn} />);
        component
            .find(IconButton).first()
            .simulate('click');
        expect(clickFn).toHaveBeenCalledTimes(1);
    })
});
