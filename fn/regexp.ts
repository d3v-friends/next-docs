const regexp = {
    username: new RegExp("^[a-z][a-z|0-9]{7,20}$"),
    password: new RegExp(/^[a-zA-Z0-9!@#$%^&*()_+|~`=-{}\[\];':",./<>?\\]{8,30}$/),
};

export default regexp;
