class RemoteDB {
    constructor(url) {
        this.target = url;
    }

    create(path, object, callback) {
        $.ajax({
            type: "POST",
            url: this.target + path,
            data: object,
            dataType: "dataType",
            success: function (result) {
                callback(result)
            }
        });
    }

    read (path, callback) {
        $.ajax({
            type: "GET",
            url: this.target + path,
            dataType: "json",
            success: function (result) {
                callback(result);
            }
        });
    }

    update(path, object, callback) {
        $.ajax({
            url: this.target + path,
            type: "PUT",
            object: object,
            success: function (result) {
                callback(result);
            }
        })
    }

    delete(path, callback) {
        $.ajax({
            url: this.target + path,
            type: "DELETE",
            success: function (result) {
                callback(result);
            }
        })
    }
}

export { RemoteDB }