import { shallow, mount } from 'enzyme';
import { OrderList } from '../../../components/Admin/Order/OrderList';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import * as getDataModule from '../../../api/getData';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

describe('OrderList', () => {

    beforeEach(() => {
        
    })

    it('should render correctly', () => {
        const component = shallow(<OrderList />);
        expect(component).not.toBe(null);
      });
    
    /* it('should render correctly 4 info buttons', async() => {
            jest.spyOn(getDataModule, 'getData').mockImplementation(() => ({
                data: [
                  {
                      _id: 'mockOrderListId',
                      userInfo: [
                          {firstName: 'mockUserFirstName',
                              lastName: 'mockUserLastName',}
                      ],
                      cartInfo: {
                          cartItems:{
                              productId: 'mockProductId',
                              quantity: 22,
                              specificationValue: 'mockSpecificationValue',
                              _id: '_id'
                          }
                      },
                      createdAt: 'mockCreatedTime',
                      status: 'paid'
                  }
                ]
              }));
              let a;
            

              const component = mount(<OrderList />);
              await act(() => {
                component.update();
                a = component.find(IconButton)
                console.log('ewrwerew', a);
                
              })
              expect(a).toHaveLength(4); 
        component.unmount();
    });*/
});

