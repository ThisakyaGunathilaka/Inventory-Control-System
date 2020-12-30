from django.urls import path
from files.api import FileUploadApi, ImageList, ImageEditAPI, ImageDetail, ImageDelete

app_name = 'files'
urlpatterns = [
	path('upload/', FileUploadApi.as_view(), name='file-upload'),
	path('list/', ImageList.as_view(), name='image-list'),
	path('<int:id>/', ImageDetail.as_view(), name='image-detail'),
	path('<int:id>/edit/', ImageEditAPI.as_view(), name='image-detail'),
	path('<int:id>/delete/', ImageDelete.as_view(), name='image-delete'),

]
