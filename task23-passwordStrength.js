const criteria = [
    {
        check: (password) => password.length > 8,
        suggestion: "increase password length",
        score: 4,
    },
    {
        check: (password) => password.length > 12,
        suggestion: "increase password length",
        score: 2,
    },
    {
        check: (password) => /[A-Z]/g.test(password),
        suggestion: "add upeercase letters",
        score: 1,
    },
    {
        check: (password) => /[a-z]/g.test(password),
        suggestion: "add lowercase letters",
        score: 1,
    },
    {
        check: (password) => /[\.,?\[\]\\]/g.test(password),
        suggestion: "add special characters",
        score: 1,
    },
    {
        check: (password) => /[0-9]/g.test(password),
        suggestion: "add digits",
        score: 1,
    }
];

function getPasswordStrength(password) {
    let suggestions = [];
    let score = 0;

    criteria.forEach((c) => {
        if (c.check(password)) {
            score += c.score;
        } else {
            suggestions.push(c.suggestion);
        }
    });


    return {
        score,
        suggesions: suggestions.filter((value, index, array)=>array.indexOf(value) === index)
    }
}