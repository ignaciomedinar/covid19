from django.shortcuts import render
import requests, json
from django.urls import reverse
# from .filters import OrderFilter

# Create your views here.
def home(request):
    return render(request,'base.html')

def table(request):
    args = {}
    response=requests.get('https://api.covid19api.com/summary')
    args['contents'] = response.json()

    # query = request.GET.get('query')
    # api_key = locu_api
    # url = 'https://api.locu.com/v1_0/venue/search/?api_key=' + api_key
    # locality = query.replace(' ', '%20')
    # final_url = url + "&locality=" + locality + "&category=restaurant"
    # json_obj = urllib2.urlopen(final_url)
    # data = json.load(json_obj)

    return render(request,'getapiinfo/home.html',args)

def country(request,country):
    #print(country)
    #print(request.GET)
    args ={}
    response=requests.get('https://api.covid19api.com/total/country/'+country)
    #print(response)
    #print(response.text)
    args['contents'] = response.json()
    return render(request,'getapiinfo/country.html',args)

def charts(request):
    return render(request,'getapiinfo/charts.html')