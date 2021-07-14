import { shallow } from 'enzyme';
import { AlertDialog } from '../../components/Utilities/AlertDialog'
import Button from '@material-ui/core/Button';

describe('AlertDialog', () => {
  it('should render correctly', () => {
    const component = shallow(<AlertDialog />);
    //expect(component).toMatchSnapshot();
    expect(component).not.toBe(null);
    expect(component.find(Button)).toHaveLength(2);
  });
});
