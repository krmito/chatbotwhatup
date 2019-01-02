let utilities = {
    functionWithCallBack: function (functionX: any, timeout: number) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                functionX
                resolve();
            }, timeout);
        });

        return promise;
    },
    isContain: function (input: string, value: string) {
        if (input.includes(value)) {
            return value;
        }
    }
}

module.exports = utilities;