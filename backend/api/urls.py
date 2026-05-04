from django.urls import path
from . import views

urlpatterns = [
    path('record/', views.RecordListCreateView.as_view()),
    path('record/<int:pk>/', views.RecordReadUpdateDeleteView.as_view()),
    path('user/register/', views.CreateUserView.as_view()),
]