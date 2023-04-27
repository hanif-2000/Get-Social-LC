import axios from 'axios'
const BASE_URL = "http://122.160.74.251:8025/"

const headers = {
    'Content-Type': 'application/json',
};
// 1. Signup API -
export const onRegister = (body, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}signup/`,
        data: body,
        headers: headers,
    })
        .then(function (response) {
            onResponse(response);
        })
        .catch(error => {
            onError(error);
        });
};
// 2. Login API -
export const onLogin = (body, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}login/`,
        data: body,
        headers: headers,
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.response?.data);
        });
};
// 3. Forgot Password API -
export const onForgotPassword = (body, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}forget-password/`,
        data: body,
        headers: headers,
    })
        .then(function (response) {
            onResponse(response);
        })
        .catch(error => {
            onError(error);
        });
}
// 4. Password Change API -
export const PasswordChange = (body, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}password-change/`,
        data: body,
        headers: headers,
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}
// 5. Reset Password API -
export const onResetPassword = (body, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}reset-password/`,
        data: body,
        headers: headers,
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}
export const VerifyEmail = (uid, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}verify-email/${uid}`,
        data: {},
        headers: headers,
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}
//================= After login/Register API Steps -==========
// 1. Add Name API -
export const onAddName = (body, token, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}add-name/${token}/`,
        data: body,
        headers: headers
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}
// 2. Add Date of birth -
export const AddDateofbirth = (formData, token, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}add-dateofbirth/${token}/`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.response?.data);
        });
}
// 3. Add Picture API -
export const AddPicture = (body, token, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}/add-picture/${token}/`,
        data: body,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.response?.data);
        });
}
// 4. Add University API -
export const AddUniversity = (body, token, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}add-university/${token}/`,
        data: body,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.response?.data);
        });
}
// 5. Add Biography API -
export const AddBiography = (body, token, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}add-biography/${token}/`,
        data: body,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.response?.data);
        });
}
// 6. Get User detail API -
export const GetUserDetail = (token, onResponse, onError) => {
    axios({
        method: 'GET',
        url: `${BASE_URL}get-details/`,
        data: {},
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.respons?.data);
        });
}

// 7. get-university API -
export const getUniversity = (token, onResponse, onError) => {
    axios({
        method: 'PUT',
        url: `${BASE_URL}get-university/`,
        data: {},
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.response?.data);
        });
}


// 8. OTP veryfi API -
export const onVerifyOTP = (body, token, onResponse, onError) => {
    axios({
        method: 'PUT',
        url: `${BASE_URL}verify-otp/<${token}>/`,
        data: body,
        headers: headers
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error?.response?.data);
        });
}

// 9. get Rooms API -
export const getRoomApi = (token, onResponse, onError) => {
    axios({
        method: 'GET',
        url: `${BASE_URL}room/`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}

// 10. join Rooms API -
export const joinRoomByID = (token, id, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `${BASE_URL}join-room/${id}/`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            onResponse(response);
        })
        .catch(error => {
            onError(error);
        });
}

export const getRoomData = (token,id, onResponse, onError) => {
    axios({
        method: 'GET',
        url: `http://122.160.74.251:8025/room/${id}/`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`

        }
    })
        .then(function (response) {
            onResponse(response);
        })
        .catch(error => {
            onError(error);
        });
}
export const createRoomAPI = (token, formData, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `http://122.160.74.251:8025/room/`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}

export const sendMessage = (token, formData, onResponse, onError) => {
    axios({
        method: 'POST',
        url: `http://122.160.74.251:8025/message/`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}


export const getMessage = (roomId, onResponse, onError) => {
    axios({
        method: 'GET',
        url: `http://122.160.74.251:8025/get-message/${roomId}/`,
        data: {},
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(function (response) {
            onResponse(response?.data);
        })
        .catch(error => {
            onError(error);
        });
}