import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ItemCard } from '../../components/Cards/ItemCard';
import { mockUserStore } from '../../constants';
import { mockItemCardItem } from '../../constants';

Enzyme.configure({ adapter: new Adapter() });

describe('ItemCard', () => {
    it('should render correctly', () => {
        const component = shallow(<ItemCard item={mockItemCardItem} userStore={mockUserStore} />);
        expect(component).not.toBe(null);
    });
})
