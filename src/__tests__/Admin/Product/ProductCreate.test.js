import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ProductCreate } from '../../../components/Admin/Product/ProductCreate';
import { TextInput } from '../../../components/Utilities/TextInput';
import { AvailabilitySwitch } from '../../../components/Admin/Product/AvailabilitySwitch';
import { SpecificationDropdown } from '../../../components/Admin/Product/SpecificationDropdown';
import { InputDropdown } from '../../../components/Utilities/InputDropdown';
import Button from '@material-ui/core/Button';
import { mockProductStoreItem } from '../../../constants';
import { ProductStoreKeys } from '../../../store/productStore';
import * as postDataModule from '../../../api/postData';

Enzyme.configure({ adapter: new Adapter() });
/* jest.mock('../../../api/postData.js', () => ({
    postData: () => mockPostData()
})); */

describe('ProductCreate', () => {
    it('should render correctly', () => {
        const component = shallow(<ProductCreate />);
        expect(component).not.toBe(null);
    });

    it('should render 7 TextInput components', () => {
        const component = shallow(<ProductCreate />);
        expect(component.find(TextInput)).toHaveLength(7);
    });

    it('should render 1 AvailabilitySwitch component', () => {
        const component = shallow(<ProductCreate />);
        expect(component.find(AvailabilitySwitch)).toHaveLength(1);
    });

    it('should render 1 SpecificationDropdown component', () => {
        const component = shallow(<ProductCreate />);
        expect(component.find(SpecificationDropdown)).toHaveLength(1);
    });

    it('should render 1 input element', () => {
        const component = shallow(<ProductCreate />);
        expect(component.find('input')).toHaveLength(1);
    });

    it('should render 1 InputDropdown component', () => {
        const component = shallow(<ProductCreate />);
        expect(component.find(InputDropdown)).toHaveLength(1);
    });

    /* it('click save button should call function', async () => {
        const mockPostData = jest.fn();
        jest.spyOn(postDataModule, 'postData').mockImplementation(() => mockPostData);
        //jest.spyOn(postDataModule, 'postData').mockReturnValue(Promise.resolve(mockPostData));
        const getTestId = (testId) => `[data-test="${testId}"]`

        const component = mount(<ProductCreate />);

        // for (var key in ProductStoreKeys) {
        //    component.find(getTestId('textInput-' + ProductStoreKeys[key])).find('input').simulate(
        //        'change', mockProductStoreItem[key]);
        //}
        component.find(getTestId('textInput-productName')).find('input').simulate(
            'change',  {target: {value:'mockProductName'}});
        component.find(getTestId('textInput-manufacturerName')).find('input').simulate(
            'change', {target: {value:'mockManuName'}}); 
        component.find(getTestId('textInput-inventory')).find('input').simulate(
            'change', {target: {value:'3'}});
        component.find(getTestId('textInput-imageUrl')).find('input').simulate(
            'change', {target: {value:'mockImageUrl'}});
        component.find(getTestId('textInput-price')).find('input').simulate(
            'change', {target: {value:'4'}});
        component.find(getTestId('textInput-description')).find('input').simulate(
            'change', {target: {value:'mockProductDescription'}});
        component.find(getTestId('textInput-packageSize')).find('input').simulate(
            'change', {target: {value:'mockPackageSize'}});
        component.find(SpecificationDropdown).find('option').at(1).simulate('change', {target: {value:'type'}});
        component.find(getTestId('textInput-specificationDescr')).find('input').simulate('change', 
        {target: {value:['mockSD3, mockSD4']}});
        component.find(InputDropdown).find('option').first().simulate('change', {target: {value:'skin care'}});
        await component.update();
        component.find(Button).simulate('click');
        await component.update();
        await Promise.resolve();
        expect(mockPostData).toBeCalledTimes(1);
    }); */
});

