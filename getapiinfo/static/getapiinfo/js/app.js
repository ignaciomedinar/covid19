function dspChrt(country, total, countryD, deaths, countryR, recovered) {

    var ctx = document.getElementById('total-cases').getContext('2d');
    var dth = document.getElementById('total-deaths').getContext('2d');
    var rcv = document.getElementById('total-recovered').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: country,
            datasets: [{
                label: 'Total Cases',
                data: total, // json value received used in method
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "black",
                borderWidth: 1
            }]
        }
    });
    var myChart2 = new Chart(dth, {
        type: 'bar',
        data: {
            labels: countryD,
            datasets: [{
                label: 'Total Deaths',
                data: deaths, // json value received used in method
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "black",
                borderWidth: 1
            }]
        }
    });
    var myChart3 = new Chart(rcv, {
        type: 'bar',
        data: {
            labels: countryR,
            datasets: [{
                label: 'Total Recovered',
                data: recovered, // json value received used in method
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "black",
                borderWidth: 1
            }]
        }
    });
}

function loadChart(){
    var data, allCountry = [], allTotal = [], country = [], total = [], 
    allDeaths = [], allRecovered=[], deaths=[], recovered=[], allCountryD = [],allCountryR = []
    countryD = [], countryR = [];
    
    var requestURL = 'https://api.covid19api.com/summary'; //URL of the JSON data
    var request = new XMLHttpRequest({mozSystem: true}); // create http request  

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            data = JSON.parse(request.responseText);
            //data = JSONdata;
            //console.log(data.Countries[1])
            for (var i=0; i<data.Countries.length;i++) {
                allCountry.push(data.Countries[i].Country);
                allTotal.push(data.Countries[i].TotalConfirmed);
                allDeaths.push(data.Countries[i].TotalDeaths);
                allRecovered.push(data.Countries[i].TotalRecovered);
                
            }
         
            //1) combine the arrays:
            var list = [], list2=[], list3=[];
            for (var j = 0; j < allCountry.length; j++) 
                list.push({'country': allCountry[j], 'total': allTotal[j]})
            for (var j = 0; j < allCountry.length; j++) 
                list2.push({'country': allCountry[j], 'deaths': allDeaths[j]})
            for (var j = 0; j < allCountry.length; j++) 
                list3.push({'country': allCountry[j], 'recovered': allRecovered[j]});
                
            //2) sort:
            list.sort(function(a, b) {
                return ((b.total < a.total) ? -1 : ((b.total == a.total) ? 0 : 1));
                //Sort could be modified to, for example, sort on the age 
                // if the name is the same.
            });
            list2.sort(function(a, b) {
                return ((b.deaths < a.deaths) ? -1 : ((b.deaths == a.deaths) ? 0 : 1));
                //Sort could be modified to, for example, sort on the age 
                // if the name is the same.
            });
            list3.sort(function(a, b) {
                return ((b.recovered < a.recovered) ? -1 : ((b.recovered == a.recovered) ? 0 : 1));
                //Sort could be modified to, for example, sort on the age 
                // if the name is the same.
            });

            //3) separate them back out:
            for (var k = 0; k < list.length; k++) {
                allCountry[k] = list[k].country;
                allTotal[k] = list[k].total;
                
                allCountryD[k] = list2[k].country;
                allDeaths[k]= list2[k].deaths;
                allCountryR[k] = list3[k].country;
                allRecovered[k]=list3[k].recovered;
            }
            
            for (var i=0; i<10;i++) {
                country.push(allCountry[i]);
                total.push(allTotal[i]);
                countryD.push(allCountryD[i]);
                deaths.push(allDeaths[i]);
                countryR.push(allCountryR[i]);
                recovered.push(allRecovered[i]);
            }
            
            /*
            console.log('hum', hum);
            console.log('vibrate', vibrate);
            console.log('data', data);
            */      
            dspChrt(country, total, countryD, deaths, countryR, recovered);                
        }
    } 
    request.open('GET', requestURL);
    request.send(); // send the request

}
// loadChart();