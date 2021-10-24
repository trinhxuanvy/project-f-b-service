class Service {
    formatCurrency (money, type, object) {
        const formater = new Intl.NumberFormat(
            type,
            object
        );
        
        return formater.format(money);
    }
}

module.exports = new Service();