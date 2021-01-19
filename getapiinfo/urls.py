from django.urls import path
from .import views

app_name='getapiinfo'
urlpatterns = [
    path('',views.home),
    path('table/',views.table,name='table'), 
    path('table/<slug:country>/',views.country,name='country'),
    path('charts/', views.charts, name='charts'),
]
