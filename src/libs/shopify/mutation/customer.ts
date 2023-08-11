import { customerFragment } from "../fragment/customer";

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

export const customerDefaultAddressUpdateMutaion = `
mutation CustomerDefaultAddressUpdate($token: String!, $addressId: ID!) {
  customerDefaultAddressUpdate(customerAccessToken: $token, addressId: $addressId) {
    customerUserErrors {
      code
      field
      message
    }
  }
}
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
      id
    }
    customerUserErrors {
      message
      code
      field
    }
  }
}
`

export const customerAddressCreateMuation = `
mutation CustomerAddressCreate($address: MailingAddressInput!, $token: String!) {
  customerAddressCreate(address: $address, customerAccessToken: $token) {
    customerAddress {
      id
    }
    customerUserErrors {
      message
      code
      field
    }
  }
}
`;

export const customerRecoverMutation = `
mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      message
      code
      field
    }
  }
}
`;

export const customerResetByURLMutation = `
mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
  customerResetByUrl(password: $password, resetUrl: $resetUrl) {
    customerUserErrors {
      message
      code
      field
    }
  }
}
`;