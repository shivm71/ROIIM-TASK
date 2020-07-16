from django.urls import path
from . import views

app_name = 'ride'

urlpatterns = [

    path('', views.Pay.as_view(), name='ride'),

]