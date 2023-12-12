const regexp = {
    username: new RegExp(/^[a-z][a-z0-9]{7,20}$/),
    password: new RegExp(/^[a-zA-Z0-9!@#$%^&*()_+|~`=-{}\[\];':",./<>?\\]{8,30}$/),
    gitRepo: new RegExp(/^https:\/\/[a-zA-Z0-9./_-]+$/),
    gitAccessKey: new RegExp(/^ghp_.+$/),
    gitUsername: new RegExp(/^[a-z0-9]{4,20}$/),
    email: new RegExp(/^[a-z0-9-_.]+@[a-z0-9-_]+\.[a-z0-9]{2,5}$/),
};

export default regexp;
