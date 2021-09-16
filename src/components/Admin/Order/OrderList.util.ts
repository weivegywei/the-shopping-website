type UserName = {
    firstName: string;
    lastName: string
}

export type Events = {
    status: string;
    time: string
}

export type OrderInfoType = {
    productId: string;
    quantity: number;
    specificationValue: string;
    _id: string;
}

export type CartInfoType = {
    cartItems: OrderInfoType;
}

export type ResDataMapProps = {
    _id: string;
    userInfo: UserName[];
    cartInfo: CartInfoType;
    createdAt: string;
    status: string
}

export type ReturnedTimeProps = {
    events: Events[]
}

export type UserDataType = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    country: string
}

export type ListItemProps = {
    _id: string;
    cartId: string;
    guestId?: string;
    userData?: UserDataType;
    createdAt: string;
    amount: number;
    status: string;
    events: Events[]
}

enum AlignTypes {
    align = "center"
}

export type tableHeadItemsProps = {
    entry: string;
    align?: AlignTypes
}

export const tableHeadItems = [
    {entry: 'User name & info / Guest Id'},
    {entry: 'Order info', align: AlignTypes.align},
    {entry: 'Paid time', align: AlignTypes.align},
    {entry: 'Order amount', align: AlignTypes.align},
    {entry: 'Returned status', align: AlignTypes.align},
    {entry: 'Current status', align: AlignTypes.align},
    {entry: 'Edit status', align: AlignTypes.align}
]

