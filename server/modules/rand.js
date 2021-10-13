exports.randCode = length => {

    const rand = limit => Math.floor(Math.random()*limit);
    const consonants = 'bcdfghjlmnpqrstvwxyzç';
    const vowels = 'aeiou';
    const numbers = '1234567890';
    const special = '!@#$%¨&*()_+-=?/:;^~´`{}[]ªº';

    let chars = consonants + vowels + numbers + special;
    chars = chars.split('');
    let code = '';
        
    for (let i = 0; i < length; i++) {
        code += chars[rand(chars.length)];
    }

    return code;
};