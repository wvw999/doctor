import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Provider } from './provider.js'
import { Ailment } from './ailment.js'

function phoneFix(number) {
  var initialInput = (""+number).replace(/\D/g, '');
  var updatedNumber = initialInput.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!updatedNumber) ? null : "(" + updatedNumber[1] + ") " + updatedNumber[2] + "-" + updatedNumber[3];
}

$(document).ready(function() {

  let doctorList = new Provider();
  let ailmentList = new Ailment();

  $('#doctorName').submit((event) => {
    event.preventDefault();
    let docName = $('#docName').val();
    let promiseOne = doctorList.getProviderAll(docName);
    $("#outputRow").html("");
    promiseOne.then(function(response) {
      let body = JSON.parse(response);
      $("#outputRow").append(`<h3>Doctor Search Results</h3>`);
      for(let i = 0; i < body.data.length; i++) {
        let websiteData;
        let phone;
        if (body.data[i].practices[0].website == undefined) {
          websiteData = "no website";
        } else {
          websiteData = `<a href="${body.data[i].practices[0].website}">website</a>`;
        }
        if (body.data[i].practices[0].phones[0].number ==  undefined ) {
          phone = "no phone number listed";
        } else {
          phone = phoneFix(body.data[i].practices[0].phones[0].number);
        }
        $("#outputRow").append(`<div class="container listing">${body.data[i].practices[0].name}<br>${body.data[i].practices[0].visit_address.street}, ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state},  ${body.data[i].practices[0].visit_address.zip} <br> ${phone} <br>accepts new patients: ${body.data[i].practices[0].accepts_new_patients}<br>${websiteData}</div><br>`);
      }
    }, (error) => {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

  $('#ailmentName').submit((event) => {
    event.preventDefault();
    let ailmentName = $('#ailmentName').val();
    let promiseTwo = ailmentList.getAilmentAll(ailmentName);
    $("#outputRow").html("");
    promiseTwo.then(function(response) {
      let body = JSON.parse(response);
      $("#outputRow").append(`<h3>Doctors who can treat your issue:</h3>`);
      for(let i = 0; i < body.data.length; i++) {
        $("#outputRow").append(`<div class="container listing">${body.data[i].practices[0].name}<br>${body.data[i].practices[0].visit_address.street}, ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state},  ${body.data[i].practices[0].visit_address.zip} <br> ${body.data[i].practices[0].phones[0].number}<br>accepts new patients: ${body.data[i].practices[0].accepts_new_patients}<br><a href="${body.data[i].practices[0].website}">website</a></div><br>`);
      }
    }, (error) => {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
