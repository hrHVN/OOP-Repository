export default class APIClient {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    create(path, object, callback) {
      $.post({
        url: this.baseUrl + path,
        object: object,
        success: function (data, status) {
          callback(data);
        },
        error: function (error) {
          callback(error);
        }
      })
    }
  
    read(path, callback) {
      $.getJSON({
        url: this.baseUrl + path,
        success: function (data, status) {
          callback(data);
        },
        error: function (error) {
          callback(error);
        }
      })
    }
  
    update(path, object, callback) {
      $.ajax({
        url: this.baseUrl + path,
        type: "PUT",
        object: object,
        success: function (data, status) {
          callback(data);
        },
        error: function (error) {
          callback(error);
        }
      })
    }
  
    delete(path, callback) {
      $.ajax({
        url: this.baseUrl + path,
        type: "DELETE",
        success: function (data, status) {
          callback(data);
        },
        error: function (error) {
          callback(error);
        }
      })
    }
  }