export { Comment as default };

class Comment {
    constructor(object) {
        this.id = object.id;
        this.customerId = object.customerId;
        this.name = object.name;
        this.comment = object.comment;
        this.date = object.date;
    }
}