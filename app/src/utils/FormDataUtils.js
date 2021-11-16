function toFormData(data) {
    var formData = new FormData();
    for (const k in data) {
        formData.append(k, data[k]);
    }
    return formData;
}

export default toFormData;