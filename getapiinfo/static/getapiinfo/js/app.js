function dspChrt(country, total) {

    var ctx = document.getElementById('total-cases').getContext('2d');
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
}

function loadChart(){
    var data, allCountry = [], allTotal = [], country = [], total = [];
    
    var requestURL = 'https://api.covid19api.com/summary'; //URL of the JSON data
    var request = new XMLHttpRequest({mozSystem: true}); // create http request  

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            data = JSON.parse(request.responseText);
            //data = JSONdata;
            console.log(data.Countries[1])
            for (var i=0; i<data.Countries.length;i++) {
                allCountry.push(data.Countries[i].Country);
                allTotal.push(data.Countries[i].TotalConfirmed);
            }

            //1) combine the arrays:
            var list = [];
            for (var j = 0; j < allCountry.length; j++) 
                list.push({'country': allCountry[j], 'total': allTotal[j]});

            //2) sort:
            list.sort(function(a, b) {
                return ((b.total < a.total) ? -1 : ((b.total == a.total) ? 0 : 1));
                //Sort could be modified to, for example, sort on the age 
                // if the name is the same.
            });

            //3) separate them back out:
            for (var k = 0; k < list.length; k++) {
                allCountry[k] = list[k].country;
                allTotal[k] = list[k].total;
            }
            
            for (var i=0; i<15;i++) {
                country.push(allCountry[i]);
                total.push(allTotal[i]);
            }
            
            /*
            console.log('hum', hum);
            console.log('vibrate', vibrate);
            console.log('data', data);
            */      
            dspChrt(country, total);                
        }
    } 
    request.open('GET', requestURL);
    request.send(); // send the request

}
// loadChart();