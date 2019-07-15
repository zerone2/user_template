import defaultClient from 'lib/defaultClient';

export const createNewUser = (data) => {
  return defaultClient.post('/users', {
    "address": data.address,
    "detailedAddress": data.detailedAddress,
    "email": data.email,
    "name": data.name,
    "passWd": data.passWd,
    "phoneNum": data.phoneNum,
    "zipCode": data.zipCode
  });
};

export const findUserId = (name, phoneNum) => {
  return defaultClient.post('/users/forget/id',{
    "name": name,
    "phoneNum": phoneNum
  });
};

export const findUserPassword = (email, phoneNum) => {
  return defaultClient.post('/users/forget/passWd', {
    "email": email,
    "phoneNum": phoneNum
  });
};

export const updatePassword = (token, password) => {
  return defaultClient.put('/users/pass', {
    "passWd": password,
  }, {
    "headers": {
      "Authorization": "EROMTHAN" + token
    }
  })
};