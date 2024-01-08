function checkEmail(email) {
    let emailMessage = ''; // Declare the variable here
    if (email.length === 0) {
        document.getElementById('IdMsg').innerText = '';
        document.getElementById('IdMsg').style.display = 'none';
        document.getElementById('IdMsg').style.color = '#1A6DFF';
        return;
    }
    else {
        axios.get('/check-email/' + email)
            .then(response => {
                if (response.data.duplicate) {
                    emailMessage = '사용가능한 아이디입니다.';
                    document.getElementById('IdMsg').style.color = '#1A6DFF';
                    document.getElementById('Certified').disabled = false;
                    document.querySelectorAll('.form_item.Id').forEach(element => {
                        element.style.backgroundColor = '#E8F0FE';
                    })
                } 
                else {
                    emailMessage = '사용하고있는 아이디입니다.';
                    document.getElementById('IdMsg').style.color = '#ff3f3f';
                    document.getElementById('Certified').disabled = true;
                    document.querySelectorAll('.form_item.Id').forEach(element => {
                        element.style.backgroundColor = 'white';
                    })
                }
                document.getElementById('IdMsg').innerText = emailMessage;
                document.getElementById('IdMsg').style.display = 'block';
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function checkPassword(password, ConfirmPassword) {
    let passwordMessage;

    if (password.length === 0 || ConfirmPassword.length === 0) {
        passwordMessage = '비밀번호를 확인해주세요.';
        document.getElementById('pswd1Msg').style.color = '#ff3f3f';
    } else if (password === '' || ConfirmPassword === '') {
        passwordMessage = '비밀번호가 공란입니다.';
        document.getElementById('pswd1Msg').style.color = '#ff3f3f';
    } else if (password === ConfirmPassword) {
        passwordMessage = '비밀번호가 일치합니다.';
        document.getElementById('pswd1Msg').style.display = 'none';
        document.getElementById('pswd1Msg').style.color = '#1A6DFF';
        document.querySelectorAll('.form_item.lock.password').forEach(element => {
            element.style.backgroundColor = '#E8F0FE';
        })
        return;
    } else {
        passwordMessage = '비밀번호가 일치하지 않습니다.';
        document.getElementById('pswd1Msg').style.color = '#ff3f3f';
    }

    document.getElementById('pswd1Msg').innerText = passwordMessage;
    document.getElementById('pswd1Msg').style.display = 'block';
    document.querySelectorAll('.form_item.lock.password').forEach(element => {
        element.style.backgroundColor = 'white';
    })
}


function checkBirth(birthday) {
    let birthdayMessage;

    if (birthday.length === 0) {
        birthdayMessage = '생년월일을 확인해주세요.';
        document.getElementById('birthdayMsg').style.color = '#ff3f3f';
    } else if (birthday.length === 4) {
        // document.getElementById('birthdayMsg').style.display = 'none';
        document.getElementById('birthdayMsg').style.color = '#1A6DFF';
        birthdayMessage = ''; // Set to an empty string for valid 8-character birthday
    } else {
        birthdayMessage = '생년월일은 8자리 숫자로 입력해 주세요.';
        document.getElementById('birthdayMsg').style.color = '#ff3f3f';
    }

    document.getElementById('birthdayMsg').innerText = birthdayMessage;
    document.getElementById('birthdayMsg').style.display = 'block';
}

function emailSend() {
    let email = document.getElementById('email').value;
    document.getElementById('PhoneResult').style.display = 'flex';
    if (email.length > 3) {
        axios.get('/check-emailSend/' + email)
            .then(response => {
                if (response.data.send) {
                    console.log("send :", response.data.send);
                    alert("인증번호가 발송되었습니다.");
                    document.getElementById('randomNumber').value = response.data.random;
                    document.getElementById('PhoneResult').style.display = 'flex';
                } else {
                    document.getElementById('phoneMsg').innerText = '등록된 번호입니다.';
                    document.getElementById('phoneMsg').style.display = 'block';
                    document.getElementById('phoneMsg').style.color = '#ff3f3f';
                }
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        document.getElementById('phoneMsg').innerText = '전화번호를 입력해주세요';
        document.getElementById('phoneMsg').style.display = 'block';
        document.getElementById('phoneMsg').style.color = '#ff3f3f';
    }
}

function randomResult() {
    let randomResponse = document.getElementById('randomNumber').value;
    let randomPhone = document.getElementById('random').value;

    if (randomResponse === randomPhone) {
        alert('인증되었습니다.');
        document.getElementById('btnJoin').disabled = false;
        document.getElementById('ResultButton').disabled = true;
        document.getElementById('random').readOnly = true;
        document.getElementById('Certified').disabled = true;
        document.getElementById('email').readOnly = true;
        document.getElementById('Certified').disabled = true;
        document.getElementById('PhoneResult').style.display = 'none';
        document.querySelectorAll('.form_item.phone').forEach(element => {
            element.style.backgroundColor = '#E8F0FE';
        })
    } else {
        console.log(randomResponse);
        console.log(randomPhone);
        alert('인증번호가 일치하지않습니다.');
        document.getElementById('btnJoin').disabled = true;
    }
}



