from django.urls import path

from customers.api import CustomerListApi, CustomerDetailApi, CustomerAddApi, CustomerEditAPI, CustomerDeleteAPI

urlpatterns = [
    path('list/', CustomerListApi.as_view(), name='customer-list'),
    path('add/', CustomerAddApi.as_view(), name='customer-add'),
    path('<id>/', CustomerDetailApi.as_view(), name='customer-detail'),
    path('<id>/edit/', CustomerEditAPI.as_view(), name='customer-edit'),
    path('<id>/delete/', CustomerDeleteAPI.as_view(), name='customer-delete'),

]
