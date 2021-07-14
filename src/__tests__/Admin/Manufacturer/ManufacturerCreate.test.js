import { shallow, mount } from 'enzyme';
import { ManufacturerCreateComponent } from '../../../components/Admin/Manufacturer/ManufacturerCreate';
import Button from '@material-ui/core/Button';
import { TextInput } from '../../../components/Utilities/TextInput';

const mockManufacturerStore = {
    manufacturerName: 'manufac',
    logoUrl: 'www.manufac.com'
}

describe('ManufacturerCreateComponent', () => {
    it('should render correctly', () => {
        const component = shallow(<ManufacturerCreateComponent store={mockManufacturerStore} />);
        expect(component).not.toBe(null);
    });

    it('should render correctly with 1 button', () => {
        const component = shallow(<ManufacturerCreateComponent store={mockManufacturerStore} />);
        expect(component.find(Button)).toHaveLength(1);
    });

    it('should render 2 TextInput components', () => {
        const component = shallow(<ManufacturerCreateComponent store={mockManufacturerStore} />);
        expect(component.find(TextInput)).toHaveLength(2);
    });
});
