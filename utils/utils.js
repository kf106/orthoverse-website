/* ./utils/utils.js */ 

export function formatAddress(address) {
  if (address === 'Error') {
    address = 'Error: try again';
    return address;
  } else if (address) {
    address = address.substring(0,6)+'...'+address.substring(address.length-6,address.length);
    return address;
  } else {
    return null;
  }
}
