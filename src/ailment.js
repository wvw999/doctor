class Ailment {

  getAilmentAll(ailment) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${ailment}&location=45.5122%2C%20-122.6587%2C%2025&user_location=45.5122%2C%20-122.6587&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}

export {Ailment}
