# import django_filters
# import requests, json


# class OrderFilter(django_filters.FilterSet):
#     class Meta:
#         args = {}
#         response=requests.get('https://api.covid19api.com/summary')
#         args['contents'] = response.json()
#         model = args
#         fields = '__all__'