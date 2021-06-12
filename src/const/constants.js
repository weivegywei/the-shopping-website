export const productCategory = [
    'skin care', 'garments', 'electric appliances', 'fitness', 'footwears', 'perfumes & fragrances',
    'personal protective equipment', 'cosmetics', 'kitchenware', 'beddings'];

export const urlValidityPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');// fragment locator

