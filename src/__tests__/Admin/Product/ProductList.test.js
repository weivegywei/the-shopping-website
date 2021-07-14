import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ProductList } from '../../../components/Admin/Product/ProductList';
import { mockProductItem } from '../../../constants';
import * as getDataModule from '../../../api/getData';
import { act } from 'react-dom/test-utils';
import TableRow from '@material-ui/core/TableRow';

Enzyme.configure({ adapter: new Adapter() });

describe('ProductList', () => {
    const mountComponent = mount(<ProductList />);

    it('should render correctly', () => {
        const component = shallow(<ProductList />);
        expect(component).not.toBe(null);
    });

    it('should render TableRow component', () => {
        const component = shallow(<ProductList />);
        expect(component.find(TableRow)).toHaveLength(1);
    });
    
    
    /* it('should render 2 TableRow components', async() => {
        await act(() => {
            jest.spyOn(getDataModule, 'getData').mockImplementation(() => ({
                data: [
                    { mockProductItem }
                ]
            }));
        expect(mountComponent.find(TableRow)).toHaveLength(2);
        });
    })

    mountComponent.unmount(); */
})
