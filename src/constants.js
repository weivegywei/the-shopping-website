export const mockProductItem = {
    _id: 'mockProductId',
    specificationDescr: ['mockSD1, mockSD2'],
    name: 'mockProductName',
    manufacturerId: 'mockManufacturerId',
    manufacturerInfo: [
        {logoUrl: 'mockLogoUrl', name: 'mockManuName', _id: 'mockManuId'}
    ],
    price: 1,
    imageUrl: 'mockImageUrl',
    inventory: 2,
    description: 'mockProductDescription',
    packageSize: 'mockPackageSize',
    availability: true,
    specification: 'mockProductSpe',
    category: 'mockProductCategory'
}

export const mockUserStore = {
    firstName: 'mockUserFirstName',
    lastName: 'mockUserLastName',
    email: 'mockUserEmail',
    id: 'mockUserId',
    setValues: (values) => {}
}

export const mockItemCardItem = {
    _id: 'mockItemCardItemId',
    specificationDescr: ['mockItemCardItemSD'],
    imageUrl: 'mockItemCardItemImageUrl',
    name: 'mockItemCardItemName',
    price: 3
}

export const mockProductStoreItem = {
    productName: 'mockProductName',
    manufacturerName: 'mockManuName',
    inventory: 4,
    imageUrl: 'mockImageUrl',
    price: 5,
    description: 'mockProductDescription',
    packageSize: 'mockPackageSize',
    specificationDescr: ['mockSD3, mockSD4']
}

export const mockCartItem = {
    _id: 'mockCartItemId', 
    quantity: 1, 
    imageUrl: 'mockCartItemImageUrl', 
    name: 'mockCartItemName', 
    specification: 'type', 
    specificationValue: 'a', 
    inventory: 2, 
    price: 3
}

