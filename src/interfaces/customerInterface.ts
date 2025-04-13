// CustomerInformation to be posted to our database - see in front end form intake in "/checkout"
export interface CustomerInformation {
    email: string;
    country: string;
    fullName: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    zipCode: string;
  }