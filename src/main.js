import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Provider } from './provider.js'
import { Ailment } from './ailment.js'

$(document).ready(function() {

  let doctorList = new Provider();
  let nameSearch = doctorList.getProviderAll(name);






});
