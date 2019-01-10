var urlApi = 'http://157.230.17.132:4000/sales';

$(document).ready(function(){
  $.ajax({
    url: urlApi,
    method: 'GET',
    success: function(data){
      console.log(data);
      var objSospFat = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0
      };

      for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var giornoMeseAnno = obj.date;
          var meseNumero = moment(giornoMeseAnno, 'DD/MM/YYYY').format('MMMM');
          objSospFat[meseNumero] += obj.amount;
      }

      var arrayLabelsFat = [];
      var arrayDataFat = [];

      for (var key in objSospFat) {
        arrayLabelsFat.push(key);
        arrayDataFat.push(objSospFat[key]);
      }

      console.log(arrayLabelsFat);
      console.log(arrayDataFat);

      var ctxLine = document.getElementById('myChartLine');
      var chart = new Chart(ctxLine, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: arrayLabelsFat,
            datasets: [{
                label: "Period 1",
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: arrayDataFat,
            }]
        },
      });

      var SospVend = {};
      var venditeTotale = 0;

      for (var k = 0; k < data.length; k++) {
          var object = data[k];
          var nome = object.salesman;

          if (SospVend[nome] == undefined)
          {
              SospVend[nome] = 0;
          }

          SospVend[nome] += object.amount;
          venditeTotale += object.amount;
      }

      var arrayLabelsVend = [];
      var arrayDataVend = [];

      for (var key in SospVend) {
        var percentualeVendite = SospVend[key] / venditeTotale * 100;
        arrayLabelsVend.push(key);
        arrayDataVend.push(percentualeVendite.toFixed(2));
      }
      console.log(arrayLabelsVend);
      console.log(arrayDataVend);

      var ctx = document.getElementById('myChartPie');
      var myPieChart = new Chart(ctx,{
        type: 'doughnut',
        data: {
            datasets: [{
                data: arrayDataVend,
                backgroundColor: ['green', 'blue', 'orange', 'red']
            }],
            labels: arrayLabelsVend,
        }
      });
    },
    error: function() {
      alert('errore');
    }
  });

});
