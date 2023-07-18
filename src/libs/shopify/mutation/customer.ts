import { customerFragment } from "../fragment/customer";
import { addressFragment } from "../queries/customer";

export const customerCreate = `
mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
}
`;

export const customerAccessTokenCreate = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

export const customerDefaultAddressUpdate = `
mutation CustomerDefaultAddressUpdate($token: String!, $addressId: ID!) {
  customerDefaultAddressUpdate(customerAccessToken: $token, addressId: $addressId) {
    customer {
      ...customer
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
${customerFragment}
`

export const customerAddressDelete = `
mutation CustomerAddressDelete($id: ID!, $token: String!) {
  customerAddressDelete(id:$id,customerAccessToken: $token) {
    deletedCustomerAddressId
    customerUserErrors {
      code
      message
      field
    }
  }
}
`

export const customerAddressUpdateMutation = `
mutation CustomerAddressUpdate($token: String!, $id: ID!, $address: MailingAddressInput!) {
  customerAddressUpdate(customerAccessToken: $token, id: $id, address: $address) {
    customerAddress {
      ...address
    }
    customerUserErrors {
      message
      code
      field
    }
  }
}
${addressFragment("address")}
`

export const customerAddressCreateMuation = `
mutation CustomerAddressCreate($address: MailingAddressInput!, $token: String!) {
  customerAddressCreate(address: $address, customerAccessToken: $token) {
    customerAddress {
      ...customerAddress
    }
    customerUserErrors {
      message
      code
      field
    }
  }
}
${addressFragment("customerAddress")}
`