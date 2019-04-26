class TwoWayBind {
    constructor(data) {
        this.data = data;
        this.tem = Object.assign({}, this.data);
        this.addWatch();
    }

    addWatch() {
        let self = this;
        console.log('this.data', this.data);
        // console.log('11',self.data['obj']);
        Object.keys(this.data).forEach((key) => {
            Object.defineProperty(self, key, {
                set(newVal) {
                    console.log('newVal', newVal);
                    self.data[key] = newVal;
                },
                get() {
                    console.log('data', self.data);
                    return self.data[key];
                }
            });
        });
        // self.data['obj'] == 3;
        console.log('this', self.data);
    }
}



